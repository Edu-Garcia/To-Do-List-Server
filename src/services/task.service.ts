import { ApiError } from '../utils/apiErrors.util';
import { Equal, getCustomRepository, Not } from 'typeorm';
import { Task } from '../database/entities/Task.Entity';
import { TasksRepository } from '../database/repositories/task.repository';

interface ICreateTask {
  title: string;
  description: string;
  userId: string;
}

interface IUpdateTask extends ICreateTask {
  id: string;
}

export class TaskService {
  public async listTaskService(userId: string): Promise<Task[]> {
    const taskRepository = getCustomRepository(TasksRepository);
    const tasks = await taskRepository.find({
      user: { id: userId },
    });

    return tasks;
  }

  public async createTaskService({
    title,
    description,
    userId,
  }: ICreateTask): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const taskExists = await taskRepository.findOne({
      title,
      user: { id: userId },
    });

    if (taskExists) {
      throw new ApiError('Tarefa já existe!');
    }

    const task = taskRepository.create({
      title,
      description,
      user: { id: userId },
    });
    await taskRepository.save(task);

    return task;
  }

  public async updateTaskService({
    id,
    title,
    description,
    userId,
  }: IUpdateTask): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne({ id, user: { id: userId } });

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    const taskExists = await taskRepository.findOne({
      title,
      id: Not(Equal(id)),
      user: { id: userId },
    });

    if (taskExists) {
      throw new ApiError('Tarefa já existe');
    }

    task.title = title;
    task.description = description;

    await taskRepository.save(task);

    return task;
  }

  public async completeTaskService(id: string, userId: string): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne({ id, user: { id: userId } });

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    task.complete = true;

    await taskRepository.save(task);

    return task;
  }

  public async deleteTaskService(id: string, userId: string): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne({ id, user: { id: userId } });

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    await taskRepository.remove(task);

    return 'Tarefa deletada com sucesso';
  }

  public async deleteAllTasksService(userId: string): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);

    const tasks = await taskRepository.find({ user: { id: userId } });

    await taskRepository.remove(tasks);

    return 'Tarefas deletadas com sucesso';
  }
}

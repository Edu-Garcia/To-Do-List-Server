import ApiError from '../utils/apiErrors.util';
import { getCustomRepository } from 'typeorm';
import Task from '../database/entities/Task.Entity';
import { TasksRepository } from '../database/repositories/task.repository';

interface ICreateTask {
  title: string;
  description: string;
}

interface IUpdateTask extends ICreateTask {
  id: string;
}

export class TaskService {
  public async listTaskService(): Promise<Task[]> {
    const taskRepository = getCustomRepository(TasksRepository);
    const tasks = await taskRepository.find();

    return tasks;
  }

  public async createTaskService({
    title,
    description,
  }: ICreateTask): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const taskExists = await taskRepository.findOne({ title });

    if (taskExists) {
      throw new ApiError('Tarefa já existe!');
    }

    const task = taskRepository.create({ title, description });
    await taskRepository.save(task);

    return task;
  }

  public async updateTaskService({
    id,
    title,
    description,
  }: IUpdateTask): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    const taskExists = await taskRepository.findOne({ title });

    if (taskExists && task.title !== title) {
      throw new ApiError('Tarefa já existe');
    }

    task.title = title;
    task.description = description;

    await taskRepository.save(task);

    return task;
  }

  public async completeTaskService({ id }: { id: string }): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    task.complete = true;

    await taskRepository.save(task);

    return task;
  }

  public async deleteTaskService({ id }: { id: string }): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    await taskRepository.remove(task);

    return 'Tarefa deletada com sucesso';
  }

  public async deleteAllTasksService(): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);

    await taskRepository.clear();

    return 'Tarefas deletadas com sucesso';
  }
}

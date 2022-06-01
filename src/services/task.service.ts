import { ApiError } from '../utils/apiErrors.util';
import { inject, injectable } from 'tsyringe';
import {
  ICreateTask,
  ITask,
  ITasksRepository,
  IUpdateTask,
} from 'src/interfaces/ITask';

@injectable()
export class TaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {
    //
  }

  public async listTaskService(userId: string): Promise<ITask[]> {
    const tasks = await this.tasksRepository.findByUserId(userId);

    return tasks;
  }

  public async createTaskService({
    title,
    description,
    userId,
  }: ICreateTask): Promise<ITask> {
    const taskExists = await this.tasksRepository.findByTitle(title, userId);

    if (taskExists) {
      throw new ApiError('Tarefa já existe!');
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      userId,
    });

    return task;
  }

  public async updateTaskService({
    id,
    title,
    description,
    userId,
  }: IUpdateTask): Promise<ITask> {
    const task = await this.tasksRepository.findById(id, userId);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    const taskExists = await this.tasksRepository.findDuplicateTitle(
      id,
      title,
      userId,
    );

    if (taskExists) {
      throw new ApiError('Tarefa já existe');
    }

    task.title = title;
    task.description = description;

    await this.tasksRepository.save(task);

    return task;
  }

  public async completeTaskService(
    id: string,
    userId: string,
  ): Promise<string> {
    const task = await this.tasksRepository.findById(id, userId);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    task.complete = true;

    await this.tasksRepository.save(task);

    return 'Tarefa atualizada com sucesso';
  }

  public async deleteTaskService(id: string, userId: string): Promise<string> {
    const task = await this.tasksRepository.findById(id, userId);

    if (!task) {
      throw new ApiError('Tarefa não encontrada');
    }

    await this.tasksRepository.remove(task);

    return 'Tarefa deletada com sucesso';
  }

  public async deleteAllTasksService(userId: string): Promise<string> {
    const tasks = await this.tasksRepository.findByUserId(userId);

    await this.tasksRepository.remove(tasks);

    return 'Tarefas deletadas com sucesso';
  }
}

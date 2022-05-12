import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

interface IRequest {
  id: string;
  title: string;
  description: string;
}

export class UpdateTaskService {
  public async execute({ id, title, description }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }

    const taskExists = await taskRepository.findOne({ title });

    if (taskExists && task.title !== title) {
      throw new AppError('Tarefa já existe');
    }

    task.title = title;
    task.description = description;

    await taskRepository.save(task);

    return task;
  }
}

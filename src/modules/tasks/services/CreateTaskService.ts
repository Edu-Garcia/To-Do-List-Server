import AppError from '@shared/http/errors/AppError';
import Task from '../typeorm/entities/Task';
import { getCustomRepository } from 'typeorm';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

interface IRequest {
  title: string;
  description: string;
}

export class CreateTaskService {
  public async execute({ title, description }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const taskExists = await taskRepository.findOne({ title });

    if (taskExists) {
      throw new AppError('Tarefa já existe');
    }

    const task = taskRepository.create({ title, description });
    await taskRepository.save(task);

    return task;
  }
}

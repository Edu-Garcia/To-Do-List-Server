import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

interface IRequest {
  id: string;
}

export class CompleteTaskService {
  public async execute({ id }: IRequest): Promise<Task> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }

    task.complete = true;

    await taskRepository.save(task);

    return task;
  }
}

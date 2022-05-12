import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

interface IRequest {
  id: string;
}

export class DeleteTaskService {
  public async execute({ id }: IRequest): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);
    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }

    await taskRepository.remove(task);

    return 'Tarefa deletada com sucesso';
  }
}

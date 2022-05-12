import { getCustomRepository } from 'typeorm';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

export class DeleteAllTasksService {
  public async execute(): Promise<string> {
    const taskRepository = getCustomRepository(TasksRepository);

    await taskRepository.clear();

    return 'Tarefas deletadas com sucesso';
  }
}

import { getCustomRepository } from 'typeorm';
import Task from '../typeorm/entities/Task';
import { TasksRepository } from '../typeorm/repositories/TasksRepository';

export class ListTaskService {
  public async execute(): Promise<Task[]> {
    const taskRepository = getCustomRepository(TasksRepository);
    const tasks = await taskRepository.find();

    return tasks;
  }
}

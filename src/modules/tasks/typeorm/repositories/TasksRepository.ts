import { EntityRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public async findByComplete(complete: boolean): Promise<Task[] | undefined> {
    const tasks = this.find({ complete });
    return tasks;
  }
}

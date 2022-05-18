import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../entities/Task.Entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // TasksRepository
}

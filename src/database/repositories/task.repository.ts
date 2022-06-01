import { Equal, getRepository, Not, Repository } from 'typeorm';
import { Task } from '../entities/Task.Entity';
import { ITasksRepository, ICreateTask } from '../../interfaces/ITask';

export class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create({
    title,
    description,
    userId,
  }: ICreateTask): Promise<Task> {
    const task = this.ormRepository.create({
      title,
      description,
      user: { id: userId },
    });

    await this.ormRepository.save(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    await this.ormRepository.save(task);

    return task;
  }

  public async remove(task: Task): Promise<void> {
    await this.ormRepository.remove(task);
  }

  public async findByUserId(userId: string): Promise<Task[]> {
    const task = await this.ormRepository.find({
      where: { user: { id: userId } },
    });

    return task;
  }

  public async findById(id: string, userId: string): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: { id, user: { id: userId } },
    });

    return task;
  }

  public async findByTitle(
    title: string,
    userId: string,
  ): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      where: { title, user: { id: userId } },
    });

    return task;
  }

  public async findDuplicateTitle(
    id: string,
    title: string,
    userId: string,
  ): Promise<Task | undefined> {
    const task = await this.ormRepository.findOne({
      title,
      id: Not(Equal(id)),
      user: { id: userId },
    });

    return task;
  }
}

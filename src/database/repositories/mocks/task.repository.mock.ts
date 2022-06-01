import { ITask } from 'src/interfaces/ITask';

export class MockTasksRepository {
  private tasks: ITask[] = [];

  public async create(task: ITask): Promise<ITask> {
    this.tasks.push(task);
    return task;
  }

  public async save(task: ITask): Promise<ITask> {
    return task;
  }

  public async findByUserId(userId: string): Promise<ITask | undefined> {
    return this.tasks.find(task => task.user.id === userId);
  }

  public async findById(
    id: string,
    userId: string,
  ): Promise<ITask | undefined> {
    return this.tasks.find(task => task.id === id && task.user.id === userId);
  }

  public async findDuplicateTitle(
    id: string,
    title: string,
    userId: string,
  ): Promise<ITask | undefined> {
    return this.tasks.find(
      task => task.title === title && task.id !== id && task.user.id === userId,
    );
  }

  public async remove(id: string): Promise<void> {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

import { IUser } from './IUser';

export interface ITask {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  created_at: Date;
  updated_at: Date;
  user: IUser;
}

export interface ICreateTask {
  title: string;
  description: string;
  userId: string;
}

export interface IUpdateTask extends ICreateTask {
  id: string;
}

export interface ITasksRepository {
  create(data: ICreateTask): Promise<ITask>;
  save(task: ITask): Promise<ITask>;
  remove(task: ITask | ITask[]): Promise<void>;
  findByUserId(userId: string): Promise<ITask[]>;
  findById(id: string, userId: string): Promise<ITask | undefined>;
  findByTitle(title: string, userId: string): Promise<ITask | undefined>;
  findDuplicateTitle(
    id: string,
    title: string,
    userId: string,
  ): Promise<ITask | undefined>;
}

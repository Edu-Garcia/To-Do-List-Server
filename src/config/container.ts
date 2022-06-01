import { container } from 'tsyringe';
import { IUsersRepository } from 'src/interfaces/IUser';
import { ITasksRepository } from 'src/interfaces/ITask';
import { UsersRepository } from 'src/database/repositories/user.repository';
import { TasksRepository } from 'src/database/repositories/task.repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);

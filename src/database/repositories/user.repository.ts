import { ICreateUser, IUsersRepository } from 'src/interfaces/IUser';
import { Equal, getRepository, Not, Repository } from 'typeorm';
import { User } from '../entities/User.Entity';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ id });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });
    return user;
  }

  public async findDuplicatedEmail(
    id: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      email,
      id: Not(Equal(id)),
    });
    return user;
  }
}

import { IUser } from 'src/interfaces/IUser';
import { v4 } from 'uuid';

export class MockUserRepository {
  private users: IUser[] = [];

  public async create(user: IUser): Promise<IUser> {
    user.id = v4();
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    Object.assign(this.users, user);

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async remove(id: string): Promise<void> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    this.users = this.users.filter(user => user.id !== id);
  }
}

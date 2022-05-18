import { hash } from 'bcryptjs';
import { User } from 'src/database/entities/User.Entity';
import { ApiError } from 'src/utils/apiErrors.util';
import { Equal, getCustomRepository, Not } from 'typeorm';
import { UsersRepository } from '../database/repositories/user.repository';

interface ICreateUserProps {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUserProps extends ICreateUserProps {
  id: string;
}

export class UserService {
  public async listUserService(id: string): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id });
    return user;
  }

  public async createUserService({
    name,
    email,
    password,
  }: ICreateUserProps): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new ApiError('Usuário já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);

    return user;
  }

  public async updateUserService({
    id,
    name,
    email,
    password,
  }: IUpdateUserProps): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new ApiError('Usuário não encontrado!');
    }

    const userExists = await usersRepository.findOne({
      where: { email, id: Not(Equal(id)) },
    });

    if (userExists) {
      throw new ApiError('Usuário já cadastrado');
    }

    if (password) {
      password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }

  public async deleteUserService(id: string): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new ApiError('Usuário não encontrado!');
    }

    await usersRepository.remove(user);

    return 'Usuário excluído com sucesso!';
  }
}

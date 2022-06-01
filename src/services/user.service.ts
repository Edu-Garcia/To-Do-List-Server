import { hash } from 'bcryptjs';
import { ApiError } from 'src/utils/apiErrors.util';
import { inject, injectable } from 'tsyringe';
import {
  ICreateUser,
  IUsersRepository,
  IUpdateUser,
  IUser,
} from 'src/interfaces/IUser';

@injectable()
export class UserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    //
  }

  public async listUserService(id: string): Promise<IUser | undefined> {
    const user = await this.usersRepository.findById(id);
    return user;
  }

  public async createUserService({
    name,
    email,
    password,
  }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new ApiError('Usuário já cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  public async updateUserService({
    id,
    name,
    email,
    password,
  }: IUpdateUser): Promise<string> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError('Usuário não encontrado!');
    }

    const userExists = await this.usersRepository.findDuplicatedEmail(
      id,
      email,
    );

    if (userExists) {
      throw new ApiError('Usuário já cadastrado');
    }

    if (password) {
      password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await this.usersRepository.save(user);

    return 'Usuário atualizado com sucesso!';
  }

  public async deleteUserService(id: string): Promise<string> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApiError('Usuário não encontrado!');
    }

    await this.usersRepository.remove(user);

    return 'Usuário excluído com sucesso!';
  }
}

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authConfig } from 'src/config/auth';
import { User } from 'src/database/entities/User.Entity';
import { ApiError } from 'src/utils/apiErrors.util';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../database/repositories/user.repository';

interface ISessionProps {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export class SessionService {
  public async createSessionService({
    email,
    password,
  }: ISessionProps): Promise<ISessionResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new ApiError('E-mail/Senha inválidos!', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ApiError('E-mail/Senha inválidos!', 401);
    }

    const token = sign({}, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    });

    return { user, token };
  }
}

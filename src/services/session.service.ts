import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authConfig } from 'src/config/auth';
import { IUsersRepository } from 'src/interfaces/IUser';
import { ISession, ISessionResponse } from 'src/interfaces/ISession';
import { ApiError } from 'src/utils/apiErrors.util';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    //
  }

  public async createSessionService({
    email,
    password,
  }: ISession): Promise<ISessionResponse> {
    const user = await this.usersRepository.findByEmail(email);

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

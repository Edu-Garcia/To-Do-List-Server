import { IUser } from './IUser';

export interface ISession {
  email: string;
  password: string;
}

export interface ISessionResponse {
  user: IUser;
  token: string;
}

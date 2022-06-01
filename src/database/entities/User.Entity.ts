import { Column, Entity } from 'typeorm';
import { Base } from './Base.Entity';
import { IUser } from 'src/interfaces/IUser';

@Entity('users')
export class User extends Base implements IUser {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

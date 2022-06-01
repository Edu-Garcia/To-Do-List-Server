import { ITask } from 'src/interfaces/ITask';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './Base.Entity';
import { User } from './User.Entity';

@Entity('tasks')
export class Task extends Base implements ITask {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  complete: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

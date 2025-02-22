import { Entity, BaseEntity, Relation, Column } from '@puq/orm';
import { User } from '../user/user.entity.js';
import { SessionLog } from '../session-log/session-log.entity.js';

@Entity()
export class Session extends BaseEntity {
  @Column({ type: 'date' }) lastActive: string;
  @Column({ type: 'string' }) ip: string;
  @Column({ type: 'string' }) type: string;

  @Column({ type: 'string' }) location: string;
  @Column({ type: 'string' }) agent: string;

  @Column({ type: 'string' }) status: string;

  @Column({ type: 'string' }) opt: string;

  @Column({ type: 'string' }) token: string;

  @Column({ type: 'boolean' }) mfaVerified: boolean;

  @Column({ type: 'string', default: 'same' }) origin: string;

  @Relation('one-to-many', () => SessionLog, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  logs: SessionLog[];

  @Relation('many-to-one', () => User, {
    eager: true,
    onDelete: 'CASCADE',
    join: true,
  })
  user: User;
}

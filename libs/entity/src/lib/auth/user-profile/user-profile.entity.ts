import { Entity, Column, BaseEntity } from '@puq/orm';

@Entity()
export class UserProfile extends BaseEntity {
  @Column({ type: 'string', unique: true }) firstName: string;
  @Column({ type: 'string', unique: true }) middleName: string;
  @Column({ type: 'string', unique: true }) lastName: string;
  @Column({ type: 'string' }) gender: string;
  @Column({ type: 'string' }) avatar: string;
  @Column({ type: 'string' }) bio: string;
  @Column({ type: 'string' }) occupation: string;
  @Column({ type: 'string' }) organization: string;
}

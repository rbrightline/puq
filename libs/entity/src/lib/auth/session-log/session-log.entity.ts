import { BaseEntity, Column, Entity, Relation } from '@puq/orm';
import { Session } from 'inspector';

@Entity()
export class SessionLog extends BaseEntity {
  @Column({ type: 'string', required: true }) type: string;

  @Column({ type: 'string', required: true }) event: string;

  @Relation('many-to-one', () => Session, {
    onDelete: 'SET NULL',
    join: true,
    nullable: true,
  })
  session: Session;
}

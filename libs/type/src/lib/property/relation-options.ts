export type RelationType =
  | 'many-to-many'
  | 'many-to-one'
  | 'one-to-one'
  | 'one-to-many';

export type OnDelete =
  | 'RESTRICT'
  | 'CASCADE'
  | 'SET NULL'
  | 'DEFAULT'
  | 'NO ACTION';
export type OnUpdate = OnDelete;

export type Cascade =
  | boolean
  | ('insert' | 'update' | 'remove' | 'soft-remove' | 'recover')[];

export type RelationOptions = {
  type: RelationType;
  description?: string;
  target: string;
  nullable?: boolean;
  eager?: boolean;
  join?: boolean;
  cascade?: Cascade;
  onDelete?: OnDelete;
  onUpdate?: OnUpdate;
};

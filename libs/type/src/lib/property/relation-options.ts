import { Type } from '../utils/type.js';

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
  /**
   * Relation type
   */
  type: RelationType;

  /**
   * Relation description
   */
  description?: string;

  /**
   * Relation target entity name or function that return the {@link Type}
   */
  target: string | (() => Type);

  /**
   * Relation target column name, by default `id` column is used.
   */
  refColumn?: string;

  /**
   * Relation is required or nullable
   */
  nullable?: boolean;

  /**
   * Relation data is loaded by default or on request
   */
  eager?: boolean;

  /**
   * When true, for `one` relations, the id column is created, for `many` relations relation map table is created.
   */
  join?: boolean;

  /**
   * Define how should the relation data is treated upon certain operations.
   */
  cascade?: Cascade;

  /**
   * Define what happens to the target entity when the relation is deleted
   */
  onDelete?: OnDelete;

  /**
   * Define what happens to the target entity when the relation is updated
   */
  onUpdate?: OnUpdate;
};

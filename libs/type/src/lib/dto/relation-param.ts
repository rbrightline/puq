export type RelationParam = {
  /**
   * Parent entity id
   */
  id: number;

  /**
   * Relation entity id
   */
  relationId: number;

  /**
   * Relation name
   */
  relationName: string;
};

export type UnsetRelationParam = {
  id: number;
  relationName: string;
};

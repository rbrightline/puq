import type { Type } from '@puq/type';

export function entityMetadataToken(target: any) {
  return `${target.name}:entity`;
}

export function setEntityMetadata(target: any, entity: () => Type): void {
  Reflect.defineMetadata(entityMetadataToken(target), entity, target);
}

export function getEntityMetadata(target: any): () => Type {
  return Reflect.getMetadata(entityMetadataToken(target), target);
}

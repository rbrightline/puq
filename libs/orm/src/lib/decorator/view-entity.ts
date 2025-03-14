import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ViewEntity as __ViewEntity } from 'typeorm';

/**
 * View entity decorator
 * @param expression Query builder factory
 * @param selectBaseEntity
 * @returns
 */
export function ViewEntity<T extends ObjectLiteral>(
  expression: (builder: SelectQueryBuilder<T>) => SelectQueryBuilder<T>,
  selectBaseEntity = true,
): ClassDecorator {
  return (t) => {
    __ViewEntity({
      expression(dataSource) {
        const builder = dataSource.createQueryBuilder();

        if (selectBaseEntity)
          builder
            .select('m.id', 'id')
            .addSelect('m.createdAt', 'createdAt')
            .addSelect('m.updatedAt', 'updatedAt')
            .addSelect('m.deletedAt', 'deletedAt');
        return expression(builder);
      },
    })(t);
  };
}

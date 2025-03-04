import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { ViewEntity as __ViewEntity } from 'typeorm';
/**
 * TypeORM {@link __ViewEntity} decorator with prebuilt query builder that coverts id and timestamp columns.
 * @param expression {@link SelectQueryBuilder<T>} query builder
 * @param selectBaseEntity defined whether the fields of {@link BaseEntity} class are added or not to the view
 * @returns class decorator {@link ClassDecorator}
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

        expression(builder);

        return builder;
      },
    })(t);
  };
}

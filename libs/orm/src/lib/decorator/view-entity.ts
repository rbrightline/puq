import {
  ViewEntity as __ViewEntity,
  ObjectLiteral,
  SelectQueryBuilder,
} from 'typeorm';

/**
 * TypeORM view entity decorator
 * @param expression {@link SelectQueryBuilder<T>} query builder
 * @param selectBaseEntity if false, the id, and timestamp columns are not selected by default. if not false, the view entity should extends the {@link BaseView} or provide the id, and timestamp view columns manually.
 * @returns
 */
export function ViewEntity<T extends ObjectLiteral>(
  expression: (builder: SelectQueryBuilder<T>) => SelectQueryBuilder<T>,
  selectBaseEntity = true
): ClassDecorator {
  return (t) => {
    __ViewEntity({
      expression(ds) {
        const builder = ds.createQueryBuilder();

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

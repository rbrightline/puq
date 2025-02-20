import { DefaultNamingStrategy } from 'typeorm';
/**
 * Databaes naming strategy
 */
export class TableNamingStrategy extends DefaultNamingStrategy {
  override joinTableName(
    firstTableName: string,
    secondTableName: string,
    _firstPropertyName: string,
    _secondPropertyName: string
  ): string {
    return `${firstTableName}_${secondTableName}`;
  }

  override joinColumnName(
    relationName: string,
    _referencedColumnName: string
  ): string {
    return relationName;
  }

  override joinTableColumnName(
    _tableName: string,
    _propertyName: string,
    _columnName?: string
  ): string {
    return _tableName;
  }

  override joinTableInverseColumnName(
    _tableName: string,
    _propertyName: string,
    _columnName?: string
  ): string {
    return _tableName;
  }
}

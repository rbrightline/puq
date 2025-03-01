import { DefaultNamingStrategy } from 'typeorm';
/**
 * Databaes table and column naming strategy
 */
export class TableNamingStrategy extends DefaultNamingStrategy {
  override joinTableName(
    firstTableName: string,
    secondTableName: string
  ): string {
    return `${firstTableName}_${secondTableName}`;
  }

  override joinColumnName(relationName: string): string {
    return relationName;
  }

  override joinTableColumnName(_tableName: string): string {
    return _tableName;
  }

  override joinTableInverseColumnName(_tableName: string): string {
    return _tableName;
  }
}

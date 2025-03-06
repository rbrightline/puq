import type { DataSourceOptions } from 'typeorm';
import { createGroupValueProvider } from '@puq/meta';

export const {
  token: getDataSourceToken,
  provide: provideDataSource,
  inject: InjectDataSource,
} = createGroupValueProvider<DataSourceOptions>('DATASOURCE');

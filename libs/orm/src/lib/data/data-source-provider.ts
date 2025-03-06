import { createGroupValueProvider } from '@puq/meta';
import type { DataSourceOptions } from 'typeorm';

export const {
  token: getDataSourceToken,
  provide: provideDataSource,
  inject: InjectDataSource,
} = createGroupValueProvider<DataSourceOptions>('DATASOURCE');

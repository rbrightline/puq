import { DatabaseType } from './database-type.js';
import { PropertyOptions } from './property.js';
import { RelationOptions } from './relation-options.js';

export type Model = {
  databaseType?: DatabaseType;
  description?: string;
  properties?: Record<string, PropertyOptions>;
  relations?: Record<string, RelationOptions>;
  uniques?: string[];
  required?: string[];
};

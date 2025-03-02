import type { DatabaseType } from './database-type.js';
import type { PropertyOptions } from './property.js';
import type { RelationOptions } from './relation-options.js';

export type Model = {
  databaseType?: DatabaseType;
  description?: string;
  properties?: Record<string, PropertyOptions>;
  relations?: Record<string, RelationOptions>;
  uniques?: string[];
  required?: string[];
};

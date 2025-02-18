import { PropertyType } from './property-type.js';

export type CommonOptions = {
  type: PropertyType;
  required?: boolean;
  unique?: boolean;
  description?: string;
  default?: any;
};

import type { Icon } from '../ui/icon.js';
import type { InputType } from '../ui/input-type.js';
import type { DatabaseType } from './database-type.js';
import type { PropertyType } from './property-type.js';

/**
 * Common property options
 */
export type CommonOptions<T> = {
  /**
   * Property type
   */
  type: PropertyType;

  /**
   * Property name
   */
  name?: string;

  /**
   * Check the value is not undefined
   */
  required?: boolean;

  /**
   * Check the property is unique or not
   */
  unique?: boolean;

  /**
   *
   */
  readonly?: boolean;

  /**
   * Property description
   */
  description?: string;

  /**
   * If set false, the property is excluded.
   */
  expose?: boolean;

  /**
   * Default value in case the input is undefined
   */
  default?: T;

  /**
   * Example value
   */
  example?: T;

  /**
   * Example values
   */
  examples?: Readonly<T[]>;

  /**
   * If true, the string values are accepted and transformed
   */
  acceptString?: boolean;

  /**
   * Check the value is equal to property
   */
  equalToProperty?: string;

  /**
   * Check the value is not equal to property
   */
  notEqualToProperty?: string;

  /**
   * If set, the value is ignored unless the target property is set
   */
  dependOnProperty?: string;

  /**
   * If set, the property only exist if the provided property does not
   */
  notWithProperty?: string;

  /**
   * Hash the data
   */
  hash?: boolean;

  /**
   * Encrypt the data
   */
  encrypt?: boolean;

  /**
   * Allows us to pick the right column type for the data
   */
  databaseType?: DatabaseType;

  /**
   * Google icons
   */
  icon?: Icon;

  /**
   * Input type
   */
  inputType?: InputType;

  /**
   * Input label
   */
  label?: string;

  /**
   * Input hint
   */
  hint?: string;

  /**
   * Disabled input
   */
  disabled?: boolean;

  /**
   * Hidden input
   */
  hidden?: boolean;

  /**
   * if set true, the `builtin` transformers is disabled
   */
  strict?: boolean;
};

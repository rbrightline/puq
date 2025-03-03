import 'reflect-metadata';
import { Names, names, Paths, paths } from '@puq/names';
import type { Keys, Type } from '@puq/type';

/**
 * Resource metadata options to create and set the metadata
 */
export type ResourceMetadataOptions<T> = {
  /**
   * decorator target
   */
  target: T;

  /**
   * entity class factory function that return the resource entity class
   */
  entity: () => Type;
  /**
   * if set true, the requests bypass the authentication and authorization
   */
  isPublic?: boolean;
};

/**
 * Created metadata
 */
export type ResourceMetadata = {
  /**
   * Resource name which is the name of the entity
   */
  resourceName: string;

  /**
   * Factory function that returns the entity class
   */
  entity: () => Type;

  /**
   * Resource paths
   */
  paths: Readonly<Paths>;

  /**
   * Resource names
   */
  names: Readonly<Names>;

  /**
   * Public resource
   */
  isPublic?: boolean;

  /**
   * Entity columns
   */
  keys?: Keys;
};

/**
 * A utility class for managing resource metadata in a TypeScript application using reflection.
 *
 * This class leverages the `reflect-metadata` library to attach and retrieve metadata for resource entities,
 * such as entity classes, names, REST paths, and access control flags. It is designed to support metadata-driven
 * frameworks (e.g., NestJS, TypeORM) where resources (e.g., API endpoints, database entities) need to be
 * dynamically configured via decorators or runtime reflection.
 *
 * Key features:
 * - Stores metadata (e.g., entity factory, resource names, paths) on target classes.
 * - Provides strongly-typed access to metadata via generic methods.
 * - Supports public/private resource designation for authentication/authorization bypass.
 * - Integrates with `@puq/names` for naming and path conventions and `@puq/type` for type definitions.
 *
 * Usage typically involves:
 * 1. Setting metadata on a target class (e.g., via a decorator) using `set`.
 * 2. Retrieving metadata at runtime with `get` or individual accessor methods (e.g., `entity`, `paths`).
 *
 * @example
 * ```typescript
 * class UserResource {
 *   // Resource implementation
 * }
 *
 * // Set metadata
 * ResourceMetadataManager.set({
 *   target: UserResource.prototype,
 *   entity: () => UserResource,
 *   isPublic: true,
 * });
 *
 * // Get metadata
 * const metadata = ResourceMetadataManager.get(UserResource.prototype);
 * console.log(metadata.resourceName); // "UserResource"
 * console.log(metadata.isPublic);     // true
 * ```
 *
 * @remarks
 * - Requires `reflect-metadata` to be imported before use.
 * - The `target` parameter typically expects a class prototype (e.g., `MyClass.prototype`) when used with decorators.
 * - Metadata keys are stored as unique symbols to avoid naming collisions.
 *
 * @see {@link ResourceMetadataOptions} for metadata configuration options.
 * @see {@link ResourceMetadata} for the structure of retrieved metadata.
 */
export class ResourceMetadataManager {
  /**
   * Unique symbol for entity class in reflector
   */
  static readonly ENTITY = Symbol('entity:class');

  /**
   * Unique symbol for entity names in reflector
   */
  static readonly NAMES = Symbol('entity:names');

  /**
   * Entity keys
   */
  static readonly KEYS = Symbol('entity:keys');

  /**
   * Unique symbol for rest-paths in reflector
   */
  static readonly PATHS = Symbol('rest:paths');

  /**
   * Unique symbol for entity class in reflector
   */
  static readonly NAME = Symbol('resource:name');

  /**
   * Unique symbol for public metadata
   */
  static readonly PUBLIC = Symbol('is:public');

  /**
   * Set resource metadata by resource entity
   * @param target target class
   * @param entity resource entity factory class `()=> Type`
   */
  static set<T extends object>(
    options: Readonly<ResourceMetadataOptions<T>>,
  ): void {
    const constructor = options.target.constructor;
    const __entityFactory = options.entity;
    const __paths = paths(__entityFactory().name);
    const __names = names(__entityFactory().name);

    Reflect.defineMetadata(this.ENTITY, __entityFactory, constructor);
    Reflect.defineMetadata(this.PATHS, __paths, constructor);
    Reflect.defineMetadata(this.NAMES, __names, constructor);
    Reflect.defineMetadata(this.NAME, __names.className, constructor);
    Reflect.defineMetadata(this.PUBLIC, !!options.isPublic, constructor);
  }

  /**
   *
   * @param target decorator target (just pass the decorator target)
   * @returns
   */
  static get<T extends object>(target: T): ResourceMetadata {
    return {
      entity: this.entity(target),
      names: this.names(target),
      paths: this.paths(target),
      resourceName: this.resourceName(target),
      isPublic: this.isPublic(target),
    };
  }

  /**
   * Is public resource or not
   * @param target target class
   * @returns - function that returns the resource entity `()=> Type`
   */
  static isPublic<T extends object>(target: T): boolean {
    return Reflect.getMetadata(this.PUBLIC, target) === true;
  }
  /**
   * Get the factory function that returns resoruce entity `()=>Type`
   * @param target target class
   * @returns - function that returns the resource entity `()=> Type`
   */
  static entity<T extends object>(target: T): () => Type {
    return Reflect.getMetadata(this.ENTITY, target);
  }

  /**
   * Get paths for the resource entity
   * @param target target class
   * @returns - {@link Paths}
   */
  static paths<T extends object>(target: T): Paths {
    return Reflect.getMetadata(this.PATHS, target);
  }

  /**
   * Get {@link Names} for the resource entity.
   * @param target target class
   * @returns - {@link Names}
   */
  static names<T extends object>(target: T): Names {
    return Reflect.getMetadata(this.NAMES, target);
  }

  /**
   * Get entity keys
   * @param target target class
   * @returns - resouce name
   */
  static keys<T extends object>(target: T): Keys {
    return Reflect.getMetadata(this.KEYS, target);
  }

  /**
   * Get resource name from the metadata
   * @param target target class
   * @returns - resouce name
   */
  static resourceName<T extends object>(target: T): string {
    return Reflect.getMetadata(this.NAME, target);
  }
}

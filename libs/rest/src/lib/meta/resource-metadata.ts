import { Names, names, Paths, paths } from '@puq/names';
import type { Type } from '@puq/type';

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

export type ResourceMetadata = {
  resourceName: string;
  entity: () => Type;
  paths: Readonly<Paths>;
  names: Readonly<Names>;
};
/**
 * Get/Set resource metadata
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
    };
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
   * Get resource name from the metadata
   * @param target target class
   * @returns - resouce name
   */
  static resourceName<T extends object>(target: T): string {
    return Reflect.getMetadata(this.NAME, target);
  }
}

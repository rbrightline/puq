import { names } from './names.js';
import { pluralize } from './pluralize.js';

/**
 * Represents the paths used in REST API endpoints.
 */
export type RestApiPaths = {
  /**
   * The plural form of the resource path.
   * @example
   * - GET `/users` ⭐ Query all users
   * - POST `/users` Create many users
   */
  plural: string;

  /**
   * The singular form of the resource path.
   * Typically used to represent a single resource.
   * @example
   * - POST `/user` ⭐ Create user
   * - GET `/user` Get user metadata
   */
  singular: string;

  /**
   * The path parameter representing the unique identifier of a resource.
   * @example
   * - GET `/user/1` ⭐ Get user by id
   */
  id: string;

  /**
   * Increment the provided key by 1
   * @example
   * - PATCH `user/1/increment`  { key: 'count' } ⭐ Increment the count property by 1
   */
  increment: string;

  /**
   * Decrement the provided key by 1
   * @example
   * - PATCH `user/1/decrement`  { key: 'count' } ⭐ Decrement the count property by 1
   */
  decrement: string;

  /**
   * The path used to get the count of resources.
   * @example
   * - GET `/users/count` { withDeleted:true, query: query } ⭐ Count items by query
   */
  count: string;

  /**
   * The path used to represent a relation between resources.
   * @example
   * - DELETE `/user/1/category` ⭐ Set the user's cateogry relation null.
   */
  relation: string;

  /**
   * The path parameter representing the unique identifier of a related resource.
   * @example
   * - POST `/user/1/category/2` ⭐ Set the category relation (2) to user (1).
   *
   * - DELETE `/user/1/categories/2` ⭐ Remove one of the categories (2) from the user (1).
   *
   * - PUT `/user/1/categories/2` ⭐ Add one of the categories (2) to the user (1).
   */
  relationId: string;

  /**
   * Upload file path
   * @example
   * - POST `/user/1/file` { file: file } ⭐ Upload file for the user (1)
   */
  file: string;

  /**
   * Upload image path
   * @example
   * - POST /`user/1/img` { file: file } ⭐ Upload image for the user (1)
   */
  img: string;
};

/**
 * Generates REST API paths for a given resource name with an optional prefix.
 *
 * @param name - The name of the resource for which to generate paths.
 * @param prefix - An optional prefix to prepend to each path. Defaults to an empty string.
 * @returns An object containing various REST API paths for the resource.
 *
 * @property plural - The plural form of the resource path.
 * @property singular - The singular form of the resource path.
 * @property id - The path for accessing a specific resource by its ID.
 * @property plus - The path for accessing a specific resource by its ID with an additional 'plus' segment.
 * @property count - The path for accessing the count of the resources.
 * @property relation - The path for accessing a relation of a specific resource by its ID.
 * @property relationId - The path for accessing a specific relation of a specific resource by its ID and the relation's ID.
 */
export function paths(name: string, prefix = ''): RestApiPaths {
  const pf = prefix ? `${prefix}/` : '';
  const singularName = names(name).kebabCase;
  const pluralName = pluralize(singularName);
  const singularPath = `${pf}${singularName}`;
  const pluralPath = `${pf}${pluralName}`;
  const idPath = `${singularPath}/:id`;

  return {
    plural: pluralPath,
    singular: singularPath,
    id: `${idPath}`,
    increment: `${idPath}/increment`,
    decrement: `${idPath}/decrement`,
    count: `${pluralPath}/count`,
    relation: `${idPath}/:relationName`,
    relationId: `${idPath}/:relationName/:relationId`,
    file: `${idPath}/file`,
    img: `${idPath}/img`,
  };
}

import { names } from '../names/names.js';
import { pluralize } from '../names/pluralize.js';
import { Paths } from './paths-type.js';

/**
 * Create rest-api resource paths for each operations including
 * - **plural** :
 *    - GET  : find all entities by query
 *
 * - **singular** :
 *    - GET  : entity metadata
 *    - POST : insert entity
 *
 * - **id** :
 *    - GET     : find entity by id
 *    - DELETE  : delete entity by id
 *    - PUT     : udpate entity by id
 *
 * - **increment** :
 *    - PUT : increment a specific property
 *
 * - **decrement** :
 *    - PUT : decrement a specific property
 *
 * - **count** :
 *    - GET : find the cout of entities by query
 *
 * - **relation** :
 *    - GET    :  get the relation data by entity id and relation name
 *    - DELETE :  delete  the relation by entity id and relation name.
 *
 * - **relationId** :
 *    - GET    : get the relation data by enetity id and relation id
 *    - DELETE : delete the relation  by enetity id and relation id
 *    - PUT    : add the relation by enetity id and relation id
 *
 * - **file** :
 *    - GET    : get file
 *    - POST   : upload file
 *
 * - **img** :
 *    - GET    : get image file
 *    - POST   : upload image file
 *
 * @param resourceName
 * @param prefix prefix such as `api`, `resource`. Do not set the prefix here. It is recommended to do in main module.
 * @returns
 */
export function paths(resourceName: string, prefix = ''): Paths {
  const pf = prefix ? `${prefix}/` : '';
  const singularName = names(resourceName).kebabCase;
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
    relation: `${idPath}/:rn`,
    relationId: `${idPath}/:rn/:rid`,
    file: `${idPath}/file`,
    img: `${idPath}/img`,
  };
}

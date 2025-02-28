import { normalize } from '../common/normalize.js';
import { NamesOption } from './names-option.js';
import { Names } from './names-type.js';

/**
 * Generates various case formats for a given resource name.
 *
 * @param resourceName the resource name
 * @param options extra options such as prefix, suffix {@link NamesOption}
 * @returns An object containing the resource name in different case formats:
 * - `camelCase`: camelCase format.
 * - `constCase`: CONSTANT_CASE format.
 * - `kebabCase`: kebab-case format.
 * - `pascalCase`: PascalCase format.
 * - `snakeCase`: snake_case format.
 * - `titleCase`: Title Case format.
 * - `controllerName`: NameController.
 * - `serviceName`: Nameservice.
 * - `moduleName`: NameModule.
 */
export function names(resourceName: string, options?: NamesOption): Names {
  const value = normalize(resourceName);

  const pascalCase = value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/\s+/g, '');

  const camelCase = value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '');

  const constCase = value.toUpperCase().replace(/\s/g, '_');

  const titleCase = value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
    word.toUpperCase()
  );

  const kebabCase = value.replace(/\s/g, '-');

  const snakeCase = value.replace(/\s/g, '_');

  const sentenceCase = value[0].toUpperCase() + value.slice(1);

  const dotCase = value.replace(/\s/g, '.');

  const result: Names = {
    camelCase,
    kebabCase,
    constCase,
    titleCase,
    pascalCase,
    snakeCase,
    sentenceCase,
    propertyName: camelCase,
    className: pascalCase,
    fileName: kebabCase,
    constantName: constCase,

    dotCase,
    controllerName: pascalCase + 'Controller',
    serviceName: pascalCase + 'Service',
    moduleName: pascalCase + 'Module',
    createDtoName: `Create${pascalCase}Dto`,
    updateDtoName: `Update${pascalCase}Dto`,
    queryDtoName: `Query${pascalCase}Dto`,
    modelName: `${pascalCase}Model`,
    optionsName: `${pascalCase}Options`,
  };

  const { wrapper: w, prefix: p, suffix: s } = options || {};

  Object.entries(result).map(([key, value]) => {
    if (p) value = `${p}${value}`;
    if (s) value = `${value}${s}`;
    if (w) value = `${w}${value}${w}`;

    (result as any)[key] = value;
  });

  return result;
}

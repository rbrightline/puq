import { normalize } from './normalize.js';
/**
 * Represents different naming conventions for strings.
 */
export type Names = {
  /**
   * The string in PascalCase format.
   * Example: "PascalCaseExample"
   */
  pascalCase: string;

  /**
   * The string in camelCase format.
   * Example: "camelCaseExample"
   */
  camelCase: string;

  /**
   * The string in kebab-case format.
   * Example: "kebab-case-example"
   */
  kebabCase: string;

  /**
   * The string in snake_case format.
   * Example: "snake_case_example"
   */
  snakeCase: string;

  /**
   * Dot case
   * Example: 'dot.case.ts'
   */
  dotCase: string;

  /**
   * The string in CONSTANT_CASE format.
   * Example: "CONSTANT_CASE_EXAMPLE"
   */
  constCase: string;

  /**
   * Example: "Sentence case example."
   */
  sentenceCase: string;

  /**
   * The string in Title Case format.
   * Example: "Title Case Example"
   */
  titleCase: string;

  /**
   * Example: ResourceNameController
   */
  controllerName: string;

  /**
   * Example: ResourceNameService
   */
  serviceName: string;

  /**
   * Example: ResourceNameModule
   */
  moduleName: string;

  /**
   * Example: CreateResourceNameDto
   */
  createDtoName: string;

  /**
   * Example: UpdateResourceNameDto
   */
  updateDtoName: string;

  /**
   * Example: QueryResourceNameDto
   */
  queryDtoName: string;

  /**
   * Example: ResourceNameModel
   */
  modelName: string;

  /**
   * Example: ResourceNameOptions
   */
  optionsName: string;
};

export type NamesOption = {
  prefix?: string;
  suffix?: string;
  wrapper?: string;
};

/**
 * Generates various case formats for a given resource name.
 *
 * @param resourceName - The name of the resource to be transformed into different case formats.
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

  const result = {
    camelCase: value
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ''),
    constCase: value.toUpperCase().replace(/\s/g, '_'),
    kebabCase: value.replace(/\s/g, '-'),
    pascalCase,
    snakeCase: value.replace(/\s/g, '_'),
    titleCase: value.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) =>
      word.toUpperCase()
    ),

    sentenceCase: value[0].toUpperCase() + value.slice(1),
    dotCase: value.replace(/\s/g, '.'),

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

<p align="center">
  <img src="https://raw.githubusercontent.com/rbrightline/puq/refs/heads/main/libs/names/favicon.png" alt="Logo" />
</p>

# @puq/names

## Summary

Utility library that provides functions for generating various naming conventions, authentication paths, and RESTful paths for CRUD and relation operations, including count endpoints.

## Features

- **names**: Generates all variations of names based on a provided string.
- **auths**: Generates common authentication and authorization paths with an optional prefix.
- **paths**: Generates commonly used REST paths for database entity CRUD operations and relations, including count endpoints.
- **plurize**: Converts a given string between singular and plural forms. This function is used internally by all other functions to ensure consistent singular and plural naming.

## Installation

```sh
npm install mylibrary
```

## Usage

### Importing the Library

```javascript
import { names, auths, paths, plurize } from '@puq/names';
```

### names Function

Generates different versions of names based on a given string.

```javascript
const result = names('user');

export type Names = {
  /**
   * The string in PascalCase format.
   * Example: "PascalCaseExample"
   */
  pascalCase: string,

  /**
   * The string in camelCase format.
   * Example: "camelCaseExample"
   */
  camelCase: string,

  /**
   * The string in kebab-case format.
   * Example: "kebab-case-example"
   */
  kebabCase: string,

  /**
   * The string in snake_case format.
   * Example: "snake_case_example"
   */
  snakeCase: string,

  /**
   * Dot case
   * Example: 'dot.case.ts'
   */
  dotCase: string,

  /**
   * The string in CONSTANT_CASE format.
   * Example: "CONSTANT_CASE_EXAMPLE"
   */
  constCase: string,

  /**
   * Example: "Sentence case example."
   */
  sentenceCase: string,

  /**
   * The string in Title Case format.
   * Example: "Title Case Example"
   */
  titleCase: string,

  /**
   * Example: ResourceNameController
   */
  controllerName: string,

  /**
   * Example: ResourceNameService
   */
  serviceName: string,

  /**
   * Example: ResourceNameModule
   */
  moduleName: string,

  /**
   * Example: CreateResourceNameDto
   */
  createDtoName: string,

  /**
   * Example: UpdateResourceNameDto
   */
  updateDtoName: string,

  /**
   * Example: QueryResourceNameDto
   */
  queryDtoName: string,

  /**
   * Example: ResourceNameModel
   */
  modelName: string,

  /**
   * Example: ResourceNameOptions
   */
  optionsName: string,
};
```

### auths Function

Generates common authentication and authorization paths, optionally prefixed.

```javascript
const authPaths = auths('api');

export type AuthPaths = {
  /**
   * /login
   */
  login: string,

  /**
   * /login-otp
   */
  loginWithOTP: string,
  /**
   * /logout
   */
  logout: string,

  /**
   * /logout-all
   */
  logoutAll: string,

  /**
   * /signup
   */
  signup: string,

  /**
   * /forgot-password
   */
  forgotPassword: string,

  /**
   * /reset-password
   */
  resetPassword: string,

  /**
   * /has-session
   */
  hasSession: string,

  /**
   * /has-permission
   */
  hasPermission: string,
};
```

### paths Function

Generates commonly used REST paths for a database entity CRUD and relation operations, including count. Both singular and plural paths are included.

```javascript
const entityPaths = paths('user');
export type RestApiPaths = {
  /**
   * The plural form of the resource path.
   * @example
   * - GET `/users` ⭐ Query all users
   * - POST `/users` Create many users
   */
  plural: string,

  /**
   * The singular form of the resource path.
   * Typically used to represent a single resource.
   * @example
   * - POST `/user` ⭐ Create user
   * - GET `/user` Get user metadata
   */
  singular: string,

  /**
   * The path parameter representing the unique identifier of a resource.
   * @example
   * - GET `/user/1` ⭐ Get user by id
   */
  id: string,

  /**
   * Increment the provided key by 1
   * @example
   * - PATCH `user/1/increment`  { key: 'count' } ⭐ Increment the count property by 1
   */
  increment: string,

  /**
   * Decrement the provided key by 1
   * @example
   * - PATCH `user/1/decrement`  { key: 'count' } ⭐ Decrement the count property by 1
   */
  decrement: string,

  /**
   * The path used to get the count of resources.
   * @example
   * - GET `/users/count` { withDeleted:true, query: query } ⭐ Count items by query
   */
  count: string,

  /**
   * The path used to represent a relation between resources.
   * @example
   * - DELETE `/user/1/category` ⭐ Set the user's cateogry relation null.
   */
  relation: string,

  /**
   * The path parameter representing the unique identifier of a related resource.
   * @example
   * - POST `/user/1/category/2` ⭐ Set the category relation (2) to user (1).
   *
   * - DELETE `/user/1/categories/2` ⭐ Remove one of the categories (2) from the user (1).
   *
   * - PUT `/user/1/categories/2` ⭐ Add one of the categories (2) to the user (1).
   */
  relationId: string,

  /**
   * Upload file path
   * @example
   * - POST `/user/1/file` { file: file } ⭐ Upload file for the user (1)
   */
  file: string,

  /**
   * Upload image path
   * @example
   * - POST /`user/1/img` { file: file } ⭐ Upload image for the user (1)
   */
  img: string,
};
```

### plurize Function

Converts a given string between singular and plural forms.

```javascript
console.log(plurize('user')); // Output: "users"
console.log(plurize('users')); // Output: "user"
console.log(plurize('category')); // Output: "categories"
```

## Install

```bash
  pnpm add @puq/names
```

## Funding

Thank you for using `@puq/names` It's an open-source project, and maintaining it takes time and effort. If you find this library useful, please consider supporting its ongoing development. Your contributions help ensure that the project stays up-to-date, secure, and well-maintained.

[Instant Funding](https://cash.app/$puqlib)

### Your funding will go toward

- **Bug fixes and updates** to ensure compatibility with the latest versions of dependencies.
- **New features** that will make the library even more powerful.
- **Documentation** improvements to help users get the most out of [Your Library Name].
- **General maintenance** to keep the library running smoothly and securely.

Contact to the developer: [robert.brightline@gmail.com]

[Support the developer](https://cash.app/$puqlib)

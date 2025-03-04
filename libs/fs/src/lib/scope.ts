import { resolve } from 'path';
import { throwUnauthorizedError } from '@puq/error';
import { cwd } from 'process';
import type { ScopeResolver } from './scope-resolver.js';

/**
 * Creates a scoped path resolver that restricts path resolution to within a specified root directory.
 * Prevents access to outer directories by throwing an error if resolution attempts to escape the scope.
 *
 * @param root - The root directory to scope path resolution to. Defaults to the current working directory.
 * @returns A scoped resolver function conforming to {@link ScopeResolver}
 * @throws - {@link Error} via {@link throwUnauthorizedError} - If a resolved path attempts to access outside the root directory
 *
 * @example
 * // Create a scoped resolver
 * const resolver = scope('/project');
 * resolver('src', 'file.txt'); // Returns: '/project/src/file.txt'
 * resolver('..', 'outside');   // Throws: UnauthorizedError
 */
export function scope(root = cwd()): ScopeResolver {
  root = resolve(root);

  return (...paths: string[]) => {
    const resolved = resolve(...paths);
    if (!resolved.startsWith(root))
      throwUnauthorizedError(
        `You do not have a permission to access outside the ${root} directory`,
      );

    return resolved;
  };
}

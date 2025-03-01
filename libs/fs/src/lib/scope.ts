import { resolve } from 'path';
import { ErrorCode, throwUnauthorizedError } from '@puq/error';
import { cwd } from 'process';
import { ScopeResolver } from './scope-resolver.js';

/**
 * Create a scoped path resolver that prevents access to outer directories by throwing {@link ErrorCode.Unauthorized}.
 * @param root scoped directory path
 * @returns scoped resolver {@link ScopeResolver}
 */
export function scope(root = cwd()): ScopeResolver {
  root = resolve(root);

  return (...paths: string[]) => {
    const resolved = resolve(...paths);
    if (!resolved.startsWith(root))
      throwUnauthorizedError(
        `You do not have a permission to access outside the ${root} directory`
      );

    return resolved;
  };
}

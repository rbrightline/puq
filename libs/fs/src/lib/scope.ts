import { resolve } from 'path';
import { AccessDeniedError } from '@puq/error';
import { cwd } from 'process';
import { ScopeResolver } from './scope-resolver.js';

/**
 * Create a scoped path resolver that prevents access to outer directories by throwing {@link AccessDeniedError}.
 * @param root scoped directory path
 * @returns scoped resolver {@link ScopeResolver}
 */
export function scope(root = cwd()): ScopeResolver {
  root = resolve(root);

  return (...paths: string[]) => {
    const resolved = resolve(...paths);
    if (!resolved.startsWith(root))
      throw new AccessDeniedError(
        `Access denied to ${resolved} becuase it is out of the scope: ${root}`
      );

    return resolved;
  };
}

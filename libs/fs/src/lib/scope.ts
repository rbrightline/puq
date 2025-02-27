import { resolve } from 'path';
import { AccessDeniedError } from '@puq/error';
import { cwd } from 'process';

export type PathScope = (path: string) => string | never;

/**
 * Create a path resolver that restrict the access to the provided root directory only
 *
 * The scope converts all paths into absolute
 *
 * @param root Relative or absolute directory path
 *
 * ````typescript
 *    './directory'
 *    '/directory/directory'
 * ````
 *
 * @returns
 *
 * In the example below, If the `filepath` is not under the secure directory,
 * `scope` throws {@link AccessDeniedError}
 *
 * ````typescript
 *
 *    const scope = scope(join(__dirname,'secure'));
 *    const filepath = scope('../../../../secured-file.md);
 *
 * ````
 *
 */
export function scope(root = cwd(), isRootFile = false) {
  root = isRootFile ? resolve(root, '..') : resolve(root);

  return (...paths: string[]) => {
    const resolved = resolve(...paths);
    if (!resolved.startsWith(root))
      throw new AccessDeniedError(
        `Access denied to ${resolved} becuase it is out of the scope: ${root}`
      );

    return resolved;
  };
}

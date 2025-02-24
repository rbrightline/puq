import { normalize, resolve } from 'path';
import { AccessDeniedError } from '@puq/error';
import { cwd } from 'process';
import { rval } from '@puq/is';
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
export function scope(root = cwd()) {
  root = resolve(normalize(rval(root)));
  if (!root.startsWith(cwd())) throw new AccessDeniedError();
  return (...paths: string[]) => {
    const resolved = resolve(root, ...paths);
    if (!resolved.startsWith(root)) throw new AccessDeniedError();
    return resolved;
  };
}

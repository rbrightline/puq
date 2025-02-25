import { normalize, resolve } from 'path';
import { AccessDeniedError } from '@puq/error';
import { cwd } from 'process';
import { rval } from '@puq/is';
import { debug, end, start } from '@puq/debug';

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
export function scope(root = resolve(cwd(), '..')) {
  root = rval(root);
  start(scope.name);
  debug({ root });
  root = normalize(resolve(root));
  debug({ root });
  debug({ cwd: cwd() });

  const _cwd = normalize(resolve(cwd(), '..'));

  if (!root.startsWith(_cwd)) {
    debug({ accessDeniedError: true, cwd: _cwd, root });
    throw new AccessDeniedError(`${root}`);
  }

  end();
  return (...paths: string[]) => {
    start('resolve');
    debug({ paths: paths });
    const resolved = normalize(resolve(paths.join('\\')));
    debug({ resolved });
    debug({ root });
    if (!resolved.startsWith(root)) {
      debug({
        accessDeniedError: true,
        root,
        resolved,
      });
      throw new AccessDeniedError(`${root}`);
    }
    return resolved;
  };
}

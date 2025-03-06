import { workspaceRoot } from '@nx/devkit';
import { normalize } from 'path';

/**
 * The current version of 'nx' does not allow absolute paths or there is a bug.
 * `workingDir` is like cwd but it make the cwd a relative path that `nx` allows
 * @returns - the working directory which is the directory that the command is run
 */
export function cwd() {
  return normalize(process.cwd()).replace(normalize(workspaceRoot), '');
}

import { workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Update tsconfig.json's references list for the generated library
 * Add the following object to the tsconfig.json's reference list
 * **tsconfig.json**
 * ````json
 * {
 *   "references": [
 *      { "path":"./libs/<library-name>" }
 *   ]
 * }
 * ````
 * @param directory
 */
export function updateTsconfigReferences(directory: string) {
  const tsconfigFilePath = join(workspaceRoot, 'tsconfig.json');
  const tsconfigContent = JSON.parse(readFileSync(tsconfigFilePath).toString());
  if (!tsconfigContent.references) tsconfigContent.references = [];

  tsconfigContent.references.push({
    path: `./${directory}`,
  });

  writeFileSync(tsconfigFilePath, JSON.stringify(tsconfigContent));
}

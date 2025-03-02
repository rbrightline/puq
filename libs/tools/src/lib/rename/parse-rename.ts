import { debug } from '@puq/debug';
import { Command } from 'commander';
import type { RenameOptions } from './rename.js';
import { rename } from './rename.js';

export function parseRename(command: Command) {
  command

    .command('rename')
    .description('Rename file')

    .requiredOption(
      '-e, --expression <string>',
      'regular expression to match files (optional)',
    )
    .option('-d, --directory <string>', 'root directory (optional)', '.')

    .option('-f, --from <items...>', 'placeholder (optional)')
    .requiredOption('-t, --to <items...>', 'replacement (required)')
    .option('-p, --prefix <string>', 'prefix')
    .option('-s, --suffix <string>', 'suffix')

    .action((options: RenameOptions) => {
      debug(options);
      rename(options);
    });
}

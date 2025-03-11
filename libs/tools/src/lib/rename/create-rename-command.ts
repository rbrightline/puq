import type { RenameOptions } from './rename-options.js';
import { debug } from '@puq/debug';
import type { Command } from 'commander';
import { rename } from './rename.js';

export function createRenameCommand(command: Command) {
  command

    .command('rename')
    .description('Rename file')

    .option(
      '-e, --expression <string>',
      'regular expression to match files (optional)',
    )
    .option('-d, --directory <string>', 'root directory (optional)', '.')
    .option('-f, --from <items...>', 'placeholder (optional)')
    .option('-t, --to <items...>', 'replacement (optional)')
    .option('-p, --prefix <string>', 'prefix (optional)')
    .option('-s, --suffix <string>', 'suffix (optional)')
    .option('-r, --recursive <boolean>', 'recursive', (value) => {
      if (value == 'true') return true;
      return false;
    })

    .action((options: RenameOptions) => {
      debug(options);
      rename(options);
    });
}

import { debug } from '@puq/debug';
import type { Command } from 'commander';
import type { ReplaceOptions } from './replace-options.js';
import { replace } from './replace.js';

export function createReplaceCommand(command: Command) {
  command

    .command('replace')
    .description('Replace files content')

    .option('-d, --directory <string>', 'root directory (optional)', '.')
    .option(
      '-e, --expression <string>',
      'regular expression to match files (optional)',
      '',
    )
    .requiredOption('-f, --from <items...>', 'placeholders (required)')
    .requiredOption('-t, --to <items...>', 'replacements (required)')
    .option('-p, --prefix <string>', 'prefix (optional)')
    .option('-s, --suffix <string>', 'suffix (optional)')
    .action((options: ReplaceOptions) => {
      debug(options);
      replace(options);
    });
}

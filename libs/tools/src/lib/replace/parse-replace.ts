import { debug } from '@puq/debug';
import { Command } from 'commander';
import { replace, ReplaceOptions } from './replace.js';

export function parseReplace(command: Command) {
  command

    .command('replace')
    .description('Replace files content')

    .option('-d, --directory <string>', 'root directory (optional)', '.')
    .option(
      '-e, --expression <string>',
      'regular expression to match files (optional)',
      ''
    )
    .requiredOption('-f, --from <items...>', 'placeholders (requried)')
    .requiredOption('-t, --to <items...>', 'replacements (requried)')
    .option('-p, --prefix <string>', 'prefix (optional)')
    .option('-s, --suffix <string>', 'suffix (optional)')
    .action((options: ReplaceOptions) => {
      debug(options);
      replace(options);
    });
}

import { Command } from 'commander';
import { renameFile } from './rename-file.js';

export function parseRenameFile(program: Command) {
  program
    .command('rename')

    .requiredOption(
      '-e, --expression <string>',
      'regular expression to match files'
    )
    .option('-d, --directory <string>', 'root directory')
    .option('-f, --from <string>', 'placeholder')
    .requiredOption('-t, --to <string>', 'replacement')
    .option('-p, --prefix <string>', 'prefix')
    .option('-s, --suffix <string>', 'suffix')

    .name('rename')
    .description('Rename files')
    .action((_, args) => {
      renameFile(args);
    });
}

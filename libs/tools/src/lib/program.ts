import { program } from 'commander';
import { parseRenameFile } from './rename-file/parse-rename-file.js';

async function boot() {
  program.name('tools CLI').description('Common utilities').version('0.0.2');

  parseRenameFile(program);

  program.parse();
}

boot();

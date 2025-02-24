import { program } from 'commander';
import { parseRename } from './rename/parse-rename.js';
import { parseReplace } from './replace/parse-replace.js';

async function boot() {
  program.name('tools CLI').description('Common utilities').version('0.0.14');

  parseRename(program);

  parseReplace(program);

  program.parse();
}

boot();

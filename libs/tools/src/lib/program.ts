import { program } from 'commander';
import { tools } from './tools/tools.js';

async function boot() {
  program.name('tools CLI').description('tools CLI').version('0.0.1');

  program.command('tools').name('tools').description(' CLI').action(tools);

  program.parse();
}

boot();

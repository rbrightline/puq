import { program } from 'commander';
import { bootstrap } from './bootstrap.js';

async function boot() {
  program.name('sample CLI').description('sample CLI').version('0.0.1');

  program
    .command('sample')
    .name('sample')
    .description('Run the sample service')
    .action(bootstrap);

  program.parse();
}

boot();

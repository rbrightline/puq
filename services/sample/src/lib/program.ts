import { program } from 'commander';
import { bootstrap } from '@puq/boot';
import { SampleAppModule } from './sample-app.module.js';

async function boot() {
  program.name('sample CLI').description('sample CLI').version('0.0.1');

  program
    .command('sample')
    .name('sample')
    .description('Run the sample service')
    .action(async () => {
      return await bootstrap({
        module: () => SampleAppModule,
      });
    });

  program.parse();
}

boot();

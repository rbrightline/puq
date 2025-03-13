import { program } from 'commander';

async function boot() {
  program.name('sample CLI').description('sample CLI').version('0.0.1');

  program
    .command('sample')
    .name('sample')
    .description('Run the sample service')
    .action(async () => {
      // return await bootstrap({
      //   name: 'sample',
      //   profile: 'dev',
      //   module: SampleAppModule,
      // });
      throw new Error('Not implemented');
    });

  program.parse();
}

boot();

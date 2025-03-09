import { bootstrap } from '@puq/boot';
import { SampleAppModule } from './lib/sample-app.module.js';

bootstrap({
  name: 'sample',
  profile: 'dev',
  module: SampleAppModule,
});

import { bootstrap } from '@puq/boot';
import { SampleAppModule } from './lib/sample-app.module.js';
/**
 * Start the app
 */
bootstrap({
  name: 'sample',
  profile: 'dev',
  module: SampleAppModule,
});

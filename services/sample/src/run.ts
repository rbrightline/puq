import { SampleAppModule } from './lib/sample-app.module.js';
import { bootstrap } from '@puq/boot';

/**
 * Start the sample service
 */
bootstrap({ module: () => SampleAppModule });

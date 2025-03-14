import { SampleAppModule } from './lib/sample-app.module.js';
import { bootstrap } from '@puq/boot';

bootstrap({ module: () => SampleAppModule });

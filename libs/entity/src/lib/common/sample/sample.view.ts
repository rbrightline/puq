import type { SampleViewModel } from '@puq/model';
import { ViewEntity, BaseView } from '@puq/orm';
import { Sample } from './sample.entity.js';

@ViewEntity((q) => q.from(Sample, 'm'))
export class SampleView extends BaseView implements SampleViewModel {}

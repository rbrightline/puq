import { Module } from '@nestjs/common';
import { SampleController, SampleViewController } from './sample.controller.js';
import { DataSourceModule } from '@puq/orm';
import { Sample, SampleView } from '@puq/entity';

@Module({
  imports: [DataSourceModule.forFeature({ entities: [Sample, SampleView] })],
  controllers: [SampleController, SampleViewController],
})
export class SampleModule {}

import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { DataSourceModule } from '@puq/orm';
import { Sample } from '@puq/entity';

@Module({
  imports: [DataSourceModule.forFeature({ entities: [Sample] })],
  controllers: [SampleController],
})
export class SampleModule {}

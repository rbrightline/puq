import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { EntityModule } from '@puq/orm';
import { Sample, SampleView } from '@puq/entity';

@Module({
  imports: [
    EntityModule.forFeature({
      entities: [Sample, SampleView],
    }),
  ],
  controllers: [SampleController],
})
export class SampleModule {}

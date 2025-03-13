import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { Sample, SampleView } from '@puq/entity';
import { EntityModule } from '@puq/provider';

@Module({
  imports: [
    EntityModule.forFeature({
      entities: [Sample, SampleView],
    }),
  ],
  controllers: [SampleController],
})
export class SampleModule {}

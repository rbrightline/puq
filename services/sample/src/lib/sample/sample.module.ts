import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { SampleCron } from './sample.cron.js';
import { Sample, SampleView } from '@puq/entity';
import { EntityModule } from '@puq/orm';

@Module({
  imports: [
    EntityModule.forFeature({
      entities: [Sample, SampleView],
    }),
  ],
  controllers: [SampleController],
  providers: [SampleCron],
})
export class SampleModule {}

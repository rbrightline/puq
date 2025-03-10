import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { SampleCron } from './sample.cron.js';
import { provideLoggerFor } from '@puq/core';
import { Sample, SampleView } from '@puq/entity';
import { EntityModule } from '@puq/orm';
@Module({
  imports: [
    EntityModule.configure({
      entities: [Sample, SampleView],
    }),
  ],
  controllers: [SampleController],
  providers: [
    provideLoggerFor(SampleCron),
    provideLoggerFor(SampleController),
    SampleCron,
  ],
})
export class SampleModule {}

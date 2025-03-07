import { Module } from '@nestjs/common';
import { OtherController, SampleController } from './sample.controller.js';
import { SampleCron } from './sample.cron.js';
import { provideLogger } from '@puq/core';

@Module({
  imports: [],
  controllers: [SampleController, OtherController],
  providers: [
    provideLogger(SampleCron),
    provideLogger(SampleController),
    SampleCron,
  ],
})
export class SampleModule {}

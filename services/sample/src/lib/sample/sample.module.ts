import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { SampleCron } from './sample.cron.js';
import { provideLogger } from '@puq/core';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    ConfigModule.forRoot(),
  ],
  controllers: [SampleController],
  providers: [provideLogger(SampleCron), SampleCron],
})
export class SampleModule {}

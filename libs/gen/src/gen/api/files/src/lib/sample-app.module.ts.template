import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SampleModule } from './sample/sample.module.js';
import { DataSourceModule } from '@puq/orm';
import { Sample, SampleView } from '@puq/entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({ throttlers: [{ limit: 1000, ttl: 60_000 }] }),
    EventEmitterModule.forRoot({ delimiter: '.' }),
    DataSourceModule.forRoot({
      entities: [Sample, SampleView],
      synchronize: true,
      dropSchema: true,
    }),
    SampleModule,
  ],
})
export class SampleAppModule {}

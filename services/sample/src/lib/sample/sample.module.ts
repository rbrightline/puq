import { Logger, Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { SampleCron } from './sample.cron.js';
import { provideLoggerFor, provideLoggerClass } from '@puq/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample, SampleView } from '@puq/entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, SampleView])],
  controllers: [SampleController],
  providers: [
    provideLoggerClass(Logger),
    provideLoggerFor(SampleCron),
    provideLoggerFor(SampleController),
    SampleCron,
  ],
})
export class SampleModule {}

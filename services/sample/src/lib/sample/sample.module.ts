import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller.js';
import { SampleCron } from './sample.cron.js';
import { Sample, SampleView } from '@puq/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideEntityService } from '@puq/provider';
import { EntityQueryService, EntityService } from '@puq/orm';
@Module({
  imports: [TypeOrmModule.forFeature([Sample, SampleView])],
  controllers: [SampleController],
  providers: [
    SampleCron,
    provideEntityService(Sample, EntityService),
    provideEntityService(Sample, EntityQueryService),
  ],
})
export class SampleModule {}

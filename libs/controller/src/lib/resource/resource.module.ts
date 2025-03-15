import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller.js';
import { DataSourceModule } from '@puq/orm';
import { Resource } from '@puq/entity';

@Module({
  imports: [DataSourceModule.forFeature({ entities: [Resource] })],
  controllers: [ResourceController],
})
export class ResourceModule {}

import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller.js';
import { DataSourceModule } from '@puq/orm';
import { Category } from '@puq/entity';

@Module({
  imports: [DataSourceModule.forFeature({ entities: [Category] })],
  controllers: [CategoryController],
})
export class CategoryModule {}

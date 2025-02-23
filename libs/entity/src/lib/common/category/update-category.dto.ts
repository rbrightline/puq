import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto.js';
import { Dto } from '@puq/property';

@Dto()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

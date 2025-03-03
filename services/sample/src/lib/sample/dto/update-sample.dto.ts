import { PartialType } from '@nestjs/swagger';
import { CreateSampleDto } from './create-sample.dto.js';
import { Dto } from '@puq/property';

@Dto()
export class UpdateSampleDto extends PartialType(CreateSampleDto) {}

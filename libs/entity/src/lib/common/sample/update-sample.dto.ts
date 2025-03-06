import type { UpdateSampleModel } from '@puq/model';
import { CreateSampleDto } from './create-sample.dto.js';
import { PartialType } from '@nestjs/swagger';
import { Dto } from '@puq/property';

@Dto()
export class UpdateSampleDto
  extends PartialType(CreateSampleDto)
  implements UpdateSampleModel {}

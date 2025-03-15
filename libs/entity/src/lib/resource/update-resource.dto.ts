import type { UpdateResourceModel } from '@puq/model';
import { PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from './create-resource.dto.js';
import { Dto } from '@puq/property';

@Dto()
export class UpdateResourceDto
  extends PartialType(CreateResourceDto)
  implements UpdateResourceModel {}

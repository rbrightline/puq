import type { UpdateOperationModel } from '@puq/model';
import { PartialType } from '@nestjs/swagger';
import { CreateOperationDto } from './create-operation.dto.js';
import { Dto } from '@puq/property';

@Dto()
export class UpdateOperationDto
  extends PartialType(CreateOperationDto)
  implements UpdateOperationModel {}

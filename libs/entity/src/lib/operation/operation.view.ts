import type { OperationViewModel } from '@puq/model';
import { ViewEntity, BaseView } from '@puq/orm';
import { Operation } from './operation.entity.js';

@ViewEntity((builder) => {
  return builder.from(Operation, 'm');
})
export class OperationView extends BaseView implements OperationViewModel {}

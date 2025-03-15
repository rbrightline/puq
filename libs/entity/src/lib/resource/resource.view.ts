import type { ResourceViewModel } from '@puq/model';
import { ViewEntity, BaseView, ViewColumn } from '@puq/orm';
import { Resource } from './resource.entity.js';

@ViewEntity((builder) => {
  return builder.from(Resource, 'm');
})
export class ResourceView extends BaseView implements ResourceViewModel {}

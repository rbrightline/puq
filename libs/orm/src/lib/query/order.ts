import { Dto, Property } from '@puq/property';
import { OrderDirection, OrderNulls, OrderOptions } from '@puq/type';

export type OrderOptionsDtoOptions = {
  orderableColumns: string[];
};

export function CreateOrderOptionsDto(options: OrderOptionsDtoOptions) {
  @Dto()
  class OrderOptionsDto implements OrderOptions {
    @Property({
      type: 'string',
      enum: options.orderableColumns,
      default: 'id',
    })
    property: string;

    @Property({ type: 'string', enum: OrderDirection, default: 'ASC' })
    direction: OrderDirection;

    @Property({ type: 'string', enum: OrderNulls, default: 'LAST' })
    nulls: OrderNulls;
  }

  return OrderOptionsDto;
}

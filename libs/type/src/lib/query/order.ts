export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum OrderNulls {
  FIRST = 'first',
  LAST = 'last',
}

export type OrderOptions = {
  property: string;
  direction: OrderDirection;
  nulls: OrderNulls;
};

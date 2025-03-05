import type { Some } from '@puq/type';

export type TestClassWithSingleProperty<V = Some> = {
  value: V;
};

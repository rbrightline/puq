import { Model } from '@puq/type';

//  [ ] create model .model.yaml readers and parsers
export function printEntityColumns(model: Model) {
  const properties = Object.entries(model.properties || {});
  return properties;
}

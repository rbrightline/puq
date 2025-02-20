import { Dto } from '@puq/property';
import { Entity as __Entity, Unique } from 'typeorm';

/**
 * Typeorm entity decorator
 * @param uniques Composite unique constraint must be set on entity classes and must specify entity's fields to be unique
 * @returns
 */
export function Entity(uniques?: string[]): ClassDecorator {
  return (t) => {
    Dto()(t);
    __Entity()(t);
    if (uniques != undefined) Unique(uniques)(t);
  };
}

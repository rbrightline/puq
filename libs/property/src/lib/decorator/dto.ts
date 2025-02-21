import { Exclude } from 'class-transformer';

/**
 * Dto decorator
 * @returns
 */
export function Dto(): ClassDecorator {
  return (t) => {
    Exclude()(t);
  };
}

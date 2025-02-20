import { Exclude } from 'class-transformer';

export function Dto(): ClassDecorator {
  return (t) => {
    Exclude()(t);
  };
}

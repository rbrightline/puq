import { Inject, Logger } from '@nestjs/common';
import type { Provider, Type } from '@nestjs/common';

export function getLoggerToken(target: Type): string {
  return `${target.name}Logger`;
}

export function provideLogger(
  target: Type,
  logger: Type<Logger> = Logger,
): Provider {
  return {
    provide: getLoggerToken(target),
    useFactory() {
      return new logger(target.name);
    },
  };
}

export function InjectLogger(target: Type): ParameterDecorator {
  return (t, p, d) => {
    Inject(getLoggerToken(target))(t, p, d);
  };
}

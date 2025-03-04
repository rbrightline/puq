import type { Provider, Type } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';
import { Inject, Logger } from '@nestjs/common';
import { isStringOrThrow } from '@puq/is';

export const LOGGER_TOKEN_SUFFIX = 'Logger';

/**
 * Generates a unique logger token based on the target class name
 * @param targetName - Name of the target class
 * @returns Unique logger token string
 */
export function getLoggerToken(targetName: string): string {
  return `${targetName}LOGGER_TOKEN_SUFFIX`;
}

/**
 * Creates a logger provider for a specific class with customizable logger implementation
 * @template T - Type that extends Logger
 * @param target - Target class (service or controller)
 * @param logger - Custom logger implementation (defaults to NestJS Logger)
 * @returns Configured logger provider
 * @throws {TypeError} If target is not a constructor function
 */
export function provideLogger(
  target: Type,
  logger: Type<Logger> = Logger,
): Provider {
  return {
    provide: getLoggerToken(isStringOrThrow(target.name)),
    useFactory() {
      return new logger(target.name);
    },
  };
}

/**
 * Inject logger in constructor
 * @returns - {@link ParameterDecorator}
 */
export function InjectLogger(): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    if (typeof args[0] === 'function') {
      Inject(getLoggerToken(args[0].name))(...args);
    } else {
      Inject(getLoggerToken(args[0].constructor.name))(...args);
    }
  };
}

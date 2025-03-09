import type { Provider, Type } from '@nestjs/common';
import type { ParameterDecoratorParam } from '@puq/type';
import { Inject, Logger } from '@nestjs/common';
import { isStringOrThrow } from '@puq/is';

export const LOGGER_TOKEN_SUFFIX = 'Logger';

/**
 * Provides the logger class
 * @param logger - Logger class
 * @returns - the Logger provider
 */
export function provideLoggerClass(logger: Type<Logger>): Provider {
  return {
    provide: Logger,
    useClass: logger,
  };
}

/**
 * Generates a unique logger token based on the target class name
 * @param targetName - Name of the target class
 * @returns Unique logger token string
 */
export function getLoggerTokenOf(targetName: string): string {
  return `${targetName}_${LOGGER_TOKEN_SUFFIX}`;
}

/**
 * Creates a logger provider for a specific class with customized logger implementation
 * @template T - Type that extends Logger
 * @param target - Target class (service or controller)
 * @param logger - Custom logger implementation (defaults to NestJS Logger)
 * @returns Configured logger provider
 * @throws {TypeError} If target is not a constructor function
 */
export function provideLoggerFor(target: Type): Provider {
  return {
    inject: [Logger],
    provide: getLoggerTokenOf(isStringOrThrow(target.name)),
    useFactory(logger: Logger) {
      return new (logger.constructor as Type)(target.name);
    },
  };
}

/**
 * Inject logger in constructor
 * @returns - Parameter decorator
 */
export function InjectLogger(): ParameterDecorator {
  return (...args: ParameterDecoratorParam) => {
    if (typeof args[0] === 'function') {
      Inject(getLoggerTokenOf(args[0].name))(...args);
    } else {
      Inject(getLoggerTokenOf(args[0].constructor.name))(...args);
    }
  };
}

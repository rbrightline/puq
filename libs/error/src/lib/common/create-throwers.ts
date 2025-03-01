import { createThrower } from './create-thrower.js';
import { ErrorCode } from './error-code.js';
import type { ErrorThrower } from './error-thrower.js';

/**
 * Create {@link ErrorThrower}s and map them by corresponding key.
 * @returns
 */
export function createThrowers(): Record<string, ErrorThrower> {
  return Object.values(ErrorCode)
    .filter((e) => typeof e === 'string')
    .map((e: string) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [e]: createThrower((ErrorCode as any)[e]),
      };
    })
    .reduce((p, c) => ({ ...p, ...c }), {}) as unknown as Record<
    string,
    ErrorThrower
  > as Record<string, ErrorThrower>;
}

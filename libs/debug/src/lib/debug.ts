import { isDebugMode } from './is-debug-mode.js';

export function debug<T>(record: T): void;
/**
 * Debug console
 * @returns
 */
export function debug(...message: any[]): void {
  if (!isDebugMode()) return;

  if (
    message.every((e) => {
      return typeof e != 'object';
    })
  ) {
    console.debug('[ Debug ]', ...message);
  } else {
    console.debug('[ Debug ]');

    console.table(message);
  }
}

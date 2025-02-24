import { isDebugMode } from './is-debug-mode.js';

/**
 * Print a debug message if DEBUG_MODE is active
 * @returns
 */
export function debug(...message: any[]): void {
  if (!isDebugMode()) return;
  if (
    message.every((e) => {
      return typeof e != 'object';
    })
  ) {
    console.log(...message);
  } else {
    console.table(message);
  }
}

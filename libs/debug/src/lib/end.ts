import { isDebugMode } from './is-debug-mode.js';

/**
 * Print a closing indicator for the debugger if DEBUG_MODE is active
 * @returns
 */
export function end() {
  if (!isDebugMode()) return;
  console.log(`----------------------------End`);
  console.log('                                ');
  console.log('                                ');
}

import { isDebugMode } from './is-debug-mode.js';

/**
 *
 * Print a opening indicator for the debugger if DEBUG_MODE is active
 * @param context Debug context
 */
export function start(context = 'Debug') {
  if (!isDebugMode()) return;
  console.log(`[ ${context} ] ----------------------------Start`);
}

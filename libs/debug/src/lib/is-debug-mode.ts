export const DEBUG_MODE = 'DEBUG_MODE';

export function isDebugMode(): boolean {
  return [true, 'true', 1].some((e) => process.env[DEBUG_MODE] === e);
}

export function debugMode() {
  return {
    [DEBUG_MODE]: true,
  };
}

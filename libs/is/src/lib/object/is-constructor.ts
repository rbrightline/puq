/**
 * Checks if a value is a constructor function or class that can be instantiated with `new`
 * @param value - The value to check
 * @returns - boolean
 */
export function isConstructor(
  value: any,
): value is new (...args: any[]) => any {
  // Must be a function or class (typeof 'function')
  if (typeof value !== 'function') {
    return false;
  }

  try {
    new value();
    return true;
  } catch (error) {
    // If it throws a "not a constructor" error, it's not a constructor
    if (
      error instanceof TypeError &&
      error.message.includes('is not a constructor')
    ) {
      return false;
    }
    // Other errors (e.g., abstract class) might still mean it's a constructor
    // but we can't instantiate it directly
    return true; // Conservatively assume it might be a constructor
  }
}

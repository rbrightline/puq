import type { AuthPaths } from './auth-paths-type.js';

/**
 * Generate the standard authorization and authentication rest-api paths with (optional) prefix
 * @param prefix {string} prefix can be any none-empty string such as `api`, `auth`,`security`. But it is better do not set prefix here, configure it in the main module.
 * @returns auth paths {@link AuthPaths}
 */
export function authPaths(prefix?: string): AuthPaths {
  const px = prefix ? prefix + '/' : '';
  return {
    login: `${px}login`,
    otp: `${px}login-otp`,
    logout: `${px}logout`,
    logoutAll: `${px}logout-all`,
    forgotPassword: `${px}forgot-password`,
    resetPassword: `${px}reset-password`,
    signup: `${px}signup`,
    hasSession: `${px}has-session`,
    hasPermission: `${px}has-permission`,
    hasRole: `${px}has-role`,
  };
}

export type AuthPaths = {
  /**
   * /login
   */
  login: string;

  /**
   * /login-otp
   */
  loginWithOTP: string;
  /**
   * /logout
   */
  logout: string;

  /**
   * /logout-all
   */
  logoutAll: string;

  /**
   * /signup
   */
  signup: string;

  /**
   * /forgot-password
   */
  forgotPassword: string;

  /**
   * /reset-password
   */
  resetPassword: string;

  /**
   * /has-session
   */
  hasSession: string;

  /**
   * /has-permission
   */
  hasPermission: string;
};

/**
 * Geneate auth rest api paths
 * @param prefix
 * @returns
 */
export function auths(prefix = ''): AuthPaths {
  const px = prefix ? prefix + '/' : '';
  return {
    login: `${px}login`,
    loginWithOTP: `${px}login-otp`,
    logout: `${px}logout`,
    logoutAll: `${px}logout-all`,
    forgotPassword: `${px}forgot-password`,
    resetPassword: `${px}reset-password`,
    signup: `${px}signup`,
    hasSession: `${px}has-session`,
    hasPermission: `${px}has-permission`,
  };
}

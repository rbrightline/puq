/**
 * The own properties of Session without `timestamp` and `id` properties
 */
export type SessionRawModel = {
  ip?: string;
  lastActive?: string;
  location?: string;
  mfaVerified?: boolean;
  opt?: string;
  origin?: string;
  status?: string;
  token: string;
  type: string;
};

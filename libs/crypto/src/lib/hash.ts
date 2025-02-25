import * as crypto from 'crypto';

export type HashResult = { hash: string; salt: string };

/**
 * Crypto utility for secure hashing and comparison
 */
export class Hash {
  private static readonly ITERATIONS = 100000; // High iteration count for security
  private static readonly KEY_LENGTH = 32; // 256 bits
  private static readonly ALGORITHM = 'sha256';
  private static readonly SALT_LENGTH = 16; // 128 bits
  private static readonly ENCODING = 'hex';

  /**
   * Generates a secure hash from input data
   * @param data String to hash (e.g., password)
   * @returns Promise resolving to object with hash and salt (both hex-encoded)
   */
  static async hash(data: string): Promise<HashResult> {
    const salt = crypto.randomBytes(this.SALT_LENGTH).toString(this.ENCODING);
    const hash = await new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        data,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.ALGORITHM,
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey.toString(this.ENCODING));
        }
      );
    });
    return { hash, salt };
  }

  /**
   * Compares input data against a stored hash
   * @param data Input string to verify (e.g., password)
   * @param storedHash Previously generated hash
   * @param salt Salt used in original hash
   * @returns Promise resolving to boolean indicating if input matches stored hash
   */
  static async compare(
    data: string,
    storedHash: string,
    salt: string
  ): Promise<boolean> {
    const hash = await new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        data,
        salt,
        this.ITERATIONS,
        this.KEY_LENGTH,
        this.ALGORITHM,
        (err, derivedKey) => {
          if (err) reject(err);
          else resolve(derivedKey.toString(this.ENCODING));
        }
      );
    });

    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(hash, this.ENCODING),
      Buffer.from(storedHash, this.ENCODING)
    );
  }
}

import * as crypto from 'crypto';
import { Readable } from 'stream';

/**
 * Crypto utility with truly asynchronous encryption and decryption using streams
 */
export class Encryption {
  private static readonly ALGORITHM = 'aes-256-cbc';
  private static readonly KEY_LENGTH = 32; // 256 bits
  private static readonly IV_LENGTH = 16; // 128 bits for CBC
  private static readonly ENCODING = 'hex';

  /**
   * Check the key has at 256 bits
   * @param key
   */
  protected static validateKey(key: Buffer) {
    if (key.length !== this.KEY_LENGTH) {
      throw new Error(`Key must be ${this.KEY_LENGTH} bytes`);
    }
  }

  /**
   * Encrypts data using AES-256-CBC asynchronously with streams
   * @param data String to encrypt
   * @param key Encryption key (32 bytes/256 bits)
   * @returns Promise resolving to encrypted string (IV:encrypted_data in hex)
   * @throws Error if key length is invalid
   */
  static async encrypt(data: string, key: Buffer): Promise<string> {
    this.validateKey(key);

    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    return new Promise((resolve, reject) => {
      let encrypted = '';
      const input = Readable.from([data]); // Create stream from string

      input
        .pipe(cipher)
        .on('data', (chunk) => (encrypted += chunk.toString(this.ENCODING)))
        .on('end', () => resolve(`${iv.toString(this.ENCODING)}:${encrypted}`))
        .on('error', reject);
    });
  }

  /**
   * Decrypts data encrypted with AES-256-CBC asynchronously with streams
   * @param encryptedData Encrypted string (IV:encrypted_data)
   * @param key Original encryption key (32 bytes/256 bits)
   * @returns Promise resolving to decrypted string
   * @throws Error if key length is invalid or decryption fails
   */
  static async decrypt(encryptedData: string, key: Buffer): Promise<string> {
    this.validateKey(key);

    const [ivHex, encryptedHex] = encryptedData.split(':');
    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(ivHex, this.ENCODING);
    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    const input = Readable.from([Buffer.from(encryptedHex, this.ENCODING)]);

    return new Promise((resolve, reject) => {
      let decrypted = '';
      input
        .pipe(decipher)
        .on('data', (chunk) => (decrypted += chunk.toString('utf8')))
        .on('end', () => resolve(decrypted))
        .on('error', reject);
    });
  }

  /**
   * Generates a random 256-bit key
   * @returns Buffer containing a secure random key
   */
  static generateKey(): Buffer {
    return crypto.randomBytes(this.KEY_LENGTH);
  }

  /**
   * Get key from environment variables
   * @param version
   * @returns
   */
  static getKeyFromEnv(version: string) {
    return process.env[`ENCRYPTION_KEY_${version}`];
  }
}

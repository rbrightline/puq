import { Encryption } from './encryption.js';

describe('Encryption', () => {
  it('should encrypt', async () => {
    const data = 'data some '.repeat(1000);
    const secretKey = Encryption.generateKey();
    const encryptedData = await Encryption.encrypt(data, secretKey);
    const decryptedData = await Encryption.decrypt(encryptedData, secretKey);
    expect(decryptedData).toEqual(data);
  });
});

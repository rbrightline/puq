import { vi, describe, it, expect } from 'vitest';
import { dirs } from './dirs.js';

vi.mock('fs/promises', () => {
  return {
    readdir: vi.fn(async () => ['dir', 'file.ts']),
    stat: vi.fn(async (path) => ({
      isDirectory: () => path.includes('dir'),
      isFile: () => !path.includes('dir'),
    })),
  };
});

describe('dirs: list all dirs under the directory', () => {
  it('should return only directories', async () => {
    const result = await dirs('/test/path');
    expect(result).toEqual(['dir']); // Only 'dir' should be returned
  });
});

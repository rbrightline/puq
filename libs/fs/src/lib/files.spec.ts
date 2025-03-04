import { vi, describe, it, expect } from 'vitest';
import { files } from './files.js';

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
    const result = await files('/test/path');
    expect(result).toEqual(['file.ts']); // Only 'dir' should be returned
  });
});

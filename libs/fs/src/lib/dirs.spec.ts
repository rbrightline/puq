import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dirs } from './dirs.js'; // Adjust path based on your project structure
import { readdir, stat } from 'fs/promises';
import { resolve } from 'path';
import type { CommonFileOptions } from './common-file-options.js';

// Mock the fs/promises module
vi.mock('fs/promises', () => ({
  readdir: vi.fn(),
  stat: vi.fn(),
}));

// Mock path module functions (usually not necessary, but included for completeness)
vi.mock('path', () => ({
  resolve: vi.fn(async (...args: string[]) => {
    return ((await vi.importActual('path')) as any).resolve(...args);
  }),
  normalize: vi.fn(async (path: string) =>
    ((await vi.importActual('path')) as any).normalize(path),
  ),
}));

describe('dirs', () => {
  const mockReaddir = readdir as unknown as vi.Mock;
  const mockStat = stat as unknown as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should list immediate directories with relative paths (non-recursive)', async () => {
    mockReaddir.mockResolvedValueOnce(['dir1', 'file1.txt', 'dir2']);
    mockStat
      .mockResolvedValueOnce({ isDirectory: () => true } as any) // dir1
      .mockResolvedValueOnce({ isDirectory: () => false } as any) // file1.txt
      .mockResolvedValueOnce({ isDirectory: () => true } as any); // dir2

    const root = '/test/root';
    const result = await dirs(root);

    expect(mockReaddir).toHaveBeenCalledWith(resolve(root));
    expect(mockStat).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['./dir1', './dir2']);
  });

  it('should list directories recursively with absolute paths', async () => {
    mockReaddir
      .mockResolvedValueOnce(['dir1', 'file1.txt', 'dir2']) // root
      .mockResolvedValueOnce(['subdir1']) // dir1
      .mockResolvedValueOnce([]); // dir2
    mockStat
      .mockResolvedValueOnce({ isDirectory: () => true } as any) // dir1
      .mockResolvedValueOnce({ isDirectory: () => false } as any) // file1.txt
      .mockResolvedValueOnce({ isDirectory: () => true } as any) // dir2
      .mockResolvedValueOnce({ isDirectory: () => true } as any); // subdir1

    const root = '/test/root';
    const options: CommonFileOptions = { recursive: true, absolutePath: true };
    const result = await dirs(root, options);

    expect(mockReaddir).toHaveBeenCalledTimes(3); // root, dir1, dir2
    expect(mockStat).toHaveBeenCalledTimes(4);
    expect(result).toEqual([
      resolve(root, 'dir1'),
      resolve(root, 'dir1', 'subdir1'),
      resolve(root, 'dir2'),
    ]);
  });

  it('should return empty array if no directories are found', async () => {
    mockReaddir.mockResolvedValueOnce(['file1.txt', 'file2.txt']);
    mockStat
      .mockResolvedValueOnce({ isDirectory: () => false } as any)
      .mockResolvedValueOnce({ isDirectory: () => false } as any);

    const root = '/test/root';
    const result = await dirs(root);

    expect(result).toEqual([]);
  });

  it('should handle single directory with relative paths', async () => {
    mockReaddir.mockResolvedValueOnce(['singleDir']);
    mockStat.mockResolvedValueOnce({ isDirectory: () => true } as any);

    const root = '/test/root';
    const result = await dirs(root);

    expect(result).toEqual(['./singleDir']);
  });

  it('should filter out undefined values in recursive mode', async () => {
    mockReaddir
      .mockResolvedValueOnce(['dir1', 'file1.txt'])
      .mockResolvedValueOnce(['subdir1', 'subfile.txt']);
    mockStat
      .mockResolvedValueOnce({ isDirectory: () => true } as any) // dir1
      .mockResolvedValueOnce({ isDirectory: () => false } as any) // file1.txt
      .mockResolvedValueOnce({ isDirectory: () => true } as any) // subdir1
      .mockResolvedValueOnce({ isDirectory: () => false } as any); // subfile.txt

    const root = '/test/root';
    const options: CommonFileOptions = { recursive: true };
    const result = await dirs(root, options);

    expect(result).toEqual(['./dir1', './dir1/subdir1']);
  });

  it('should throw an error if readdir fails', async () => {
    mockReaddir.mockRejectedValueOnce(new Error('Permission denied'));

    const root = '/test/root';
    await expect(dirs(root)).rejects.toThrow('Permission denied');
  });

  it('should throw an error if stat fails', async () => {
    mockReaddir.mockResolvedValueOnce(['dir1']);
    mockStat.mockRejectedValueOnce(new Error('Stat error'));

    const root = '/test/root';
    await expect(dirs(root)).rejects.toThrow('Stat error');
  });

  it('should respect absolutePath option when false', async () => {
    mockReaddir.mockResolvedValueOnce(['dir1']);
    mockStat.mockResolvedValueOnce({ isDirectory: () => true } as any);

    const root = '/test/root';
    const options: CommonFileOptions = { absolutePath: false };
    const result = await dirs(root, options);

    expect(result).toEqual(['./dir1']);
  });
});

/**
 * File operation options to define output and operation types such as `recursive` and `absolutePath`.
 * These options configure behaviors for file system operations like searching, listing, or processing files.
 * For detailed information, refer to the individual property documentation below.
 *
 * @example
 * // Using CommonFileOptions in a file operation
 * const options: CommonFileOptions = {
 *   recursive: true,
 *   absolutePath: false
 * };
 * // Used with a function like `files` or `dirs` to control recursion and path format
 */
export type CommonFileOptions = {
  /**
   * Determines whether the operation should process directories recursively.
   * When set to `true`, the function traverses subdirectories and processes their files
   * and folders in addition to the top-level directory. When `false` or omitted, the operation
   * is limited to the specified directory or file without descending into subdirectories.
   * This property is useful for file system operations, such as searching, copying, or listing files.
   *
   * @default false
   *
   * @example
   * // Recursive file search
   * const opts: CommonFileOptions = { recursive: true };
   * // Will include files in subdirectories
   */
  recursive?: boolean;

  /**
   * Determines whether file paths in the output should be absolute or relative.
   * When set to `true`, paths are resolved to their absolute form (e.g., `/home/user/project/file.ts`).
   * When `false` or omitted, paths are returned as relative to the current working directory
   * (e.g., `./file.ts`). This property is useful for configuring path output in build tools,
   * file processors, or utilities where path format impacts downstream operations.
   *
   * @default false
   *
   * @example
   * // Absolute path output
   * const opts: CommonFileOptions = { absolutePath: true };
   * // Returns paths like '/home/user/project/file.ts'
   */
  absolutePath?: boolean;
};

/**
 * Rename options
 */
export class RenameOptions {
  /**
   * The root directory of the operation
   */
  directory?: string;

  /**
   * `Regular expression` string to find the files to replace.
   * For example, `.ts` would find all ts files in the root directory
   */
  expression: string;

  /**
   * The list of new values to be replaced with the `from` list items of the same index.
   *
   * For example, `from[0]` will be replaced by `to[0]`, `from[1]` with `to[1]`
   */
  to: string[];

  /**
   * Placeholders to replace with `to`. If not set, all files are renamed with the value in the `to`'s first index.
   *
   * Each placeholder in the list will be replace with the corresponding value in the same index of `to`.
   *
   * For example, `from[0]` will be replaced by `to[0]`, `from[1]` with `to[1]`
   */
  from?: string[];

  /**
   * filename suffix
   */
  suffix?: string;

  /**
   * filename prefix
   */
  prefix?: string;

  /**
   * Recursively rename the files
   */
  recursive?: boolean;
}

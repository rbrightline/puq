export type ReplaceOptions = {
  /**
   * The root directory of the file
   */
  directory?: string;

  /**
   * Regular expression string that matches the file names
   */
  expression?: string;

  /**
   * placeholder regular expression string (optional)
   */
  from: string[];

  /**
   * replacement string
   */
  to: string[];

  prefix?: string;

  suffix?: string;
};

/* eslint-disable spellcheck/spell-checker */

/**
 * Represents all valid `type` attribute values for an HTML `<input>` element.
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-type
 */
export enum InputType {
  /**
   * Regular text
   * - short text input
   */
  TEXT = 1,

  /**
   * Use this input for slightly larger text inputs such as `description`
   */
  TEXTAREA,

  /**
   * For articles and longs texts
   */
  TEXT_EDITOR,

  /**
   * List of predefined values to pick from by searching it.
   * Use this for a large list of items
   */
  AUTOCOMPLETE,

  /**
   * Password or pin
   */
  PASSWORD,

  /**
   * The input value is only either `true` or `false`
   */
  CHECKBOX,

  /**
   * A group of checkbox items to check.
   * The return-value of the input element depends on the implementation
   * It might be Record<string,boolean> or Record<string,any>
   */
  CHECKBOX_GROUP,

  /**
   * Radio button is for picking one value from a group of values
   * The return-value of the input should be the type of the single radio value.
   */
  RADIO,

  /**
   * submit button
   */
  SUBMIT,

  /**
   * Reset button
   */
  RESET,

  /**
   * button
   */
  BUTTON,

  /**
   * file upload
   */
  FILE,

  /**
   * hidden
   */
  HIDDEN,

  /**
   * Image click coordinates x and y
   */
  IMAGE,

  /**
   * Regular number
   */
  NUMBER,

  /**
   * Number range
   */
  RANGE,

  /**
   * Color picker
   */
  COLOR,

  /**
   * Date picker
   */
  DATE,

  /**
   * Date and time picker
   */
  DATETIME_LOCAL,

  /**
   * Time picker
   */
  TIME,

  /**
   * Month picker
   */
  MONTH,

  /**
   * Week picker // 2025-w23
   */
  WEEK,

  /**
   * Email
   */
  EMAIL,

  /**
   * Phone number
   */
  TEL,

  /**
   * Url
   */
  URL,

  /**
   * Search
   */
  SEARCH,

  /**
   * Select a single item
   */
  SELECT,

  /**
   * Select many item
   */
  SELECT_MULTIPLE,
}

export type CommonNumberOptions = {
  /**
   * Minimum allowed number
   */
  minimum?: number;

  /**
   * Maximum allowed number
   */
  maximum?: number;

  /**
   * Allowed numbers
   */
  enum?: Readonly<number[] | Record<string, unknown>>;

  /**
   * Not allowed numbers
   */
  notIn?: Readonly<number[]>;

  /**
   * Check the value is more than the property's value
   */
  moreThanProperty?: string;

  /**
   * Check the value is less than the property's value
   */
  lessThanProperty?: string;
};

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
  enum?: number[];

  /**
   * Not allowed numbers
   */
  notIn?: number[];

  /**
   * Check the value is more than the property's value
   */
  moreThanProperty?: string;

  /**
   * Check the value is less than the property's value
   */
  lessThanProperty?: string;
};

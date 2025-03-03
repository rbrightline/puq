/**
 * Error codes
 */
export enum ErrorCode {
  /**
   * Unauthorized access attempt
   */
  Unauthorized = 1000,

  /**
   * Session does not exist or expired
   */
  SessionNotFound,

  /**
   * Invalid token
   */
  InvalidToken,

  /**
   * Token has expired
   */
  ExpiredToken,

  /**
   * File could not be found
   */
  FileNotFound = 1100,

  /**
   * Directory does not exist
   */
  DirectoryNotFound,

  /**
   * Attempted operation is out of allowable scope
   */
  OutOfScope,

  /**
   * System is offline or unreachable
   */
  SystemOffline = 3000,

  /**
   * System is experiencing low latency issues
   */
  LowLatency,

  /**
   * A required field is missing
   */
  RequiredFieldMissing = 5000,

  /**
   * Invalid parameter
   */
  InvalidParameter,

  InvalidType,

  /**
   * Invalid string
   */
  InvalidString,

  /**
   * Invalid number
   */
  InvalidNumber,

  /**
   * Invalid integer
   */
  InvalidInteger,

  /**
   * Invalid boolean
   */
  InvalidBoolean,

  /**
   * Invalid object
   */
  InvalidObject,

  /**
   * Invalid array
   */
  InvalidArray,

  /**
   * Invalid array of strings
   */
  InvalidArrayString,

  /**
   * Invalid array of numbers
   */
  InvalidArrayNumber,

  /**
   * Invalid array of integers
   */
  InvalidArrayInteger,

  /**
   * Invalid array of booleans
   */
  InvalidArrayBoolean,

  /**
   * Invalid array of objects
   */
  InvalidArrayObject,

  /**
   * Missing required string field
   */
  RequiredString,

  /**
   * Missing required number field
   */
  RequiredNumber,

  /**
   * Missing required integer field
   */
  RequiredInteger,

  /**
   * Missing required boolean field
   */
  RequiredBoolean,

  /**
   * Missing required object field
   */
  RequiredObject,

  /**
   * Missing required array field
   */
  RequiredArray,

  /**
   * Field cannot be empty
   */
  EmptyField = 5100,

  /**
   * String field is empty
   */
  EmptyString,

  /**
   * Number field is empty
   */
  EmptyNumber,

  /**
   * Integer field is empty
   */
  EmptyInteger,

  /**
   * Boolean field is empty
   */
  EmptyBoolean,

  /**
   * Object field is empty
   */
  EmptyObject,

  /**
   * Array field is empty
   */
  EmptyArray,

  /**
   * Field value is invalid
   */
  InvalidField = 5200,

  /**
   * Value is shorter than minimum length
   */
  MinLength,

  /**
   * Value exceeds maximum length
   */
  MaxLength,

  /**
   * Number is less than the minimum
   */
  MinNumber,

  /**
   * Number exceeds the maximum
   */
  MaxNumber,

  /**
   * Array has fewer items than the minimum
   */
  MinArraySize,

  /**
   * Array exceeds the maximum size
   */
  MaxArraySize,

  /**
   * Missing required property in object
   */
  MissingProperty,

  /**
   * Object has fewer properties than the minimum
   */
  MinProperties,

  /**
   * Object exceeds the maximum number of properties
   */
  MaxProperties,
}

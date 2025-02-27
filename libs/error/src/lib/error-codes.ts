export enum ErrorCode {
  // Auth
  UNAUTORIZED = 10001,

  // System
  SYSTEM_IS_DOWN = 20001,
  OFFLINE,
  LOW_LATENCY,

  // Validation Errors
  REQURIED_VALUE = 50001,
  INVALID_VALUE,

  // IO
  ACCESS_DENIED = 60001,
  FILE_NOT_FOUND,
  DIRECTORY_NOT_FOUND,
}

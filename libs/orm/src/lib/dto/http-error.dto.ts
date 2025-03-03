import { Dto, Property } from '@puq/property';

/**
 * This is the common error structure
 */
@Dto()
export class HttpErrorDto {
  /**
   * error message
   */
  @Property({ type: 'string' }) message: string;

  /**
   * status code
   */
  @Property({ type: 'integer' }) statusCode: number;
}

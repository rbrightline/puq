import { notEmptyOrThrow } from '@puq/is';
import { names } from '@puq/names';

export type AppEnvOptions = {
  /**
   * Application name
   */
  name: string;

  /**
   * Profile such as DEV
   */
  profile: string;
};

/**
 * App environment variable keys prefixed by applicaiton name and profile
 */
export class AppEnv {
  /**
   * Application name
   */
  readonly NAME: string;

  /**
   * App description
   */
  readonly DESCRIPTION: string;

  /**
   * Application port
   */
  readonly PORT: string;

  /**
   * List of origins to be allowed
   */

  readonly ORIGIN: string;

  /**
   * Secret key to be used by JWT and encryption
   */
  readonly SECRET: string;

  /**
   * Api prefix such as `api`
   */
  readonly PREFIX: string;

  /**
   * Runtime profile
   */
  readonly PROFILE: string;

  /**
   * Root username
   */
  readonly ROOT_USERNAME: string;

  /**
   * Root password
   */
  readonly ROOT_PASSWORD: string;

  constructor(protected readonly options: AppEnvOptions) {
    notEmptyOrThrow(options.name);
    notEmptyOrThrow(options.profile);

    const profile = names(options.profile).constCase;
    const name = names(options.name).constCase;

    this.NAME = `${name}_${profile}_NAME`;
    this.DESCRIPTION = `${name}_${profile}_DESCRIPTION`;
    this.PORT = `${name}_${profile}_PORT`;
    this.ORIGIN = `${name}_${profile}_ORIGIN`;
    this.SECRET = `${name}_${profile}_SECRET`;
    this.PREFIX = `${name}_${profile}_PREFIX`;
    this.PROFILE = `${name}_${profile}_PROFILE`;
    this.ROOT_USERNAME = `${name}_${profile}_ROOT_USERNAME`;
    this.ROOT_PASSWORD = `${name}_${profile}_ROOT_PASSWORD`;
  }
}

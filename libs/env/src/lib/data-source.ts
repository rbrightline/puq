import { notEmptyOrThrow } from '@puq/is';

export type DataSourceEnvOptions = {
  /**
   * App name
   */
  name: string;

  /**
   * Profile name
   */
  profile: string;
};

export class DataSourceEnv {
  public readonly DATABASE_HOST: string; //= 'DATABASE_HOST';
  public readonly DATABASE_PORT: string; //= 'DATABASE_PORT';
  public readonly DATABASE_USERNAME: string; //= 'DATABASE_USERNAME';
  public readonly DATABASE_PASSWORD: string; //= 'DATABASE_PASSWORD';
  public readonly DATABASE_NAME: string; //= 'DATABASE_NAME';

  constructor(protected readonly options: DataSourceEnvOptions) {
    notEmptyOrThrow(options.name);
    notEmptyOrThrow(options.profile);

    this.DATABASE_HOST = `${this.options.name}_${this.options.profile}_DATABASE_HOST`;
    this.DATABASE_PORT = `${this.options.name}_${this.options.profile}_DATABASE_PORT`;
    this.DATABASE_USERNAME = `${this.options.name}_${this.options.profile}_DATABASE_USERNAME`;
    this.DATABASE_PASSWORD = `${this.options.name}_${this.options.profile}_DATABASE_PASSWORD`;
    this.DATABASE_NAME = `${this.options.name}_${this.options.profile}_DATABASE_NAME`;
  }
}

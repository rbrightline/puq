export type PuqOptions = {
  /**
   * Library directory such as `./libs`, `./packages`
   */
  libsRoot: string;

  /**
   * Servce directory such as `./services`, `./apis`, `./apps`
   */
  servicesRoot: string;

  /**
   * Model library name such as `model`
   */
  modelLibrary: string;
  /**
   * Entity library name such as `entity`, `tables`, `database`
   */
  entityLibrary: string;

  /**
   * Resource library name such as `resource`, `controllers`, `modules`
   */
  resourceLibrary: string;

  /**
   * Metadata files directory that contains the `.model.yaml` model metadata files
   */
  metadataRoot: string;

  /**
   * The content is a directory that provides projects metadata for documentation and marketing purposes in JSON format
   */
  contentRoot: string;
};

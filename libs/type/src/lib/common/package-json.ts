export type PackageJSON = {
  name: string;
  version: string;
  license: string;
  description: string;
  keywords: string[];
  homepage: string;
  categories: string[];
  funding: string[];
  icon: string;
  type: string;
  main: string;
  module: string;
  types: string;
  author: {
    email: string;
    name: string;
    url: string;
  };
  repository: {
    directory: string;
    url: string;
    type: string;
  };
  bugs: {
    email: string;
    url: string;
  };
  publishConfig: {
    access: string;
    tag: string;
  };
  files: string[];
  contributors: [
    {
      email: string;
      name: string;
      url: string;
    }
  ];
  exports: {
    './package.json': string;
    '.': {
      types: string;
      import: string;
      default: string;
    };
  };
  nx: {
    sourceRoot: string;
    targets: {
      build: {
        executor: string;
        outputs: string[];
        options: {
          outputPath: string;
          main: string;
          tsConfig: string;
          skipTypeCheck: true;
          stripLeadingPaths: true;
        };
      };
      doc: {
        command: string;
      };
    };
  };
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
};

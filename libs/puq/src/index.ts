// @index(['./**/*.ts', '!./**/*{spec,test,.d,index}.ts'], f => `export * from '${f.path}.js'`)
export * from './generators/api/api.js';
export * from './generators/cli/cli.js';
export * from './generators/client/client.js';
export * from './generators/entity/entity.js';
export * from './generators/library/library.js';
export * from './generators/model/model.js';
export * from './generators/module/module.js';
export * from './helpers/get-model-options.js';
export * from './helpers/get-name.js';
export * from './helpers/project-package-json.js';
export * from './helpers/update-tsconfig-reference.js';

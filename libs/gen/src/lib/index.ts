// @index(['./**/*.ts', '!./**/*{spec,test,.d,index}.ts'], f => `export * from '${f.path}.js'`)
export * from './gen.js';
export * from './get-model-options.js';
export * from './get-name.js';
export * from './project-package-json.js';
export * from './update-tsconfig-reference.js';

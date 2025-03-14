// @index(['./**/*.ts', '!./**/*.{spec,test}.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/common-file-options.js';
export * from './lib/dirs.js';
export * from './lib/files.js';
export * from './lib/find-file.js';
export * from './lib/find-files.js';
export * from './lib/is-dir.js';
export * from './lib/is-file.js';
export * from './lib/read-json-file.js';
export * from './lib/read-yaml-file.js';
export * from './lib/scope-resolver.js';
export * from './lib/scope.js';
export * from './lib/segments.js';
export * from './lib/to-relative-path.js';
// - [ ] add simple tests use mocks, not write or read actual files

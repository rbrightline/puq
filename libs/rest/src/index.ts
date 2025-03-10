// @index(['./**/*.ts', '!./**/*.{spec,test}.ts','!./**/index.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/controller/common/create-controller.js';
export * from './lib/controller/decorator/controller.js';
export * from './lib/method/common/common.js';
export * from './lib/method/delete/delete-one-by-id.js';
export * from './lib/method/read/count.js';
export * from './lib/method/read/find-all.js';
export * from './lib/method/read/find-one-by-id.js';
export * from './lib/method/relation/add-relation.js';
export * from './lib/method/relation/remove-relation.js';
export * from './lib/method/relation/set-relation.js';
export * from './lib/method/relation/unset-relation.js';
export * from './lib/method/write/decrement.js';
export * from './lib/method/write/increment.js';
export * from './lib/method/write/save-one.js';
export * from './lib/method/write/update-one-by-id.js';

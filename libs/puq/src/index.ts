// @index(['./**/*.ts', '!./**/*{spec,test,.d,index}.ts'], f => `export * from '${f.path}'`)
export * from './generators/api/api';
export * from './generators/cli/cli';
export * from './generators/client/client';
export * from './generators/entity/entity';
export * from './generators/library/library';
export * from './generators/model/model';
export * from './generators/module/module';
export * from './helpers/get-name';
export * from './helpers/update-tsconfig-reference';

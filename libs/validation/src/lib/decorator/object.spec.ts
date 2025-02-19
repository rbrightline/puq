import 'reflect-metadata';
import { PropertyOptions as O } from '@puq/type';
import { __validateTestClass, TestClass as T } from '../utils/test-utils.js';
import { __assertErrors } from './common.spec.js';
import { Exclude } from 'class-transformer';
import { PropertyValidation } from './property.js';

@Exclude()
class Obj {
  @PropertyValidation({ type: 'string' })
  value: string;
}

describe('ObjectValidation', () => {
  it.each`
    value                                   | options                                       | errors
    ${{} as T}                              | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: undefined } as T}            | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: null } as T}                 | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: {} } as T}                   | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: { value: undefined } } as T} | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: { value: null } } as T}      | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: { value: 'some' } } as T}    | ${{ type: 'object', target: () => Obj } as O} | ${[] as string[]}
    ${{ value: { value: 1 } } as T}         | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: -1 } } as T}        | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: 0 } } as T}         | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: {} } } as T}        | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: [] } } as T}        | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: true } } as T}      | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: { value: false } } as T}     | ${{ type: 'object', target: () => Obj } as O} | ${['isString'] as string[]}
    ${{ value: 1 } as T}                    | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: -1 } as T}                   | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: 0 } as T}                    | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: [] } as T}                   | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: 'some' } as T}               | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: true } as T}                 | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
    ${{ value: false } as T}                | ${{ type: 'object', target: () => Obj } as O} | ${['isObject'] as string[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      __assertErrors(errors, __validateTestClass(options, value));
    }
  );
});

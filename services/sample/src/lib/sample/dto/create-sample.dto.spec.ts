import { describe, it, expect } from 'vitest';
import { CreateSampleDto } from './create-sample.dto.js';
import { Keys } from '@puq/type';
import { keys, values } from '@puq/is';
import { CreateSampleModel } from '@puq/model';

describe('CreateSampleDto', () => {
  const instance = new CreateSampleDto();
  const properties = keys(instance);

  enum __ExpectedProperties {
    str,
    num,
    int,
    bool,
    date,
    obj,
    strArr,
    numArr,
    intArr,
    boolArr,
    objArr,
    dateArr,
  }

  console.log(values(__ExpectedProperties));

  const expectedProperties: Keys<CreateSampleModel> = [
    'str',
    'num',
    'int',
    'bool',
    'date',
    'obj',
    'strArr',
    'numArr',
    'intArr',
    'boolArr',
    'objArr',
    'dateArr',
  ] as const;

  it('should initialize', () => {
    expect(instance).toBeTruthy();
  });

  for (const i of ['num']) {
    it(`should have [${i}] property`, () => {
      expect(properties).include(i);
    });
  }
});

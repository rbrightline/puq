import { describe, it, expect } from 'vitest';
import { CreateSampleDto } from './create-sample.dto.js';
import { plainToInstance } from 'class-transformer';
import { CreateSampleModel } from '@puq/model';
import { deepClone } from '@puq/is';

describe(CreateSampleDto.name, () => {
  const plainValue: CreateSampleModel = {
    booleanArray: [true],
    booleanValue: true,
    dateArray: [new Date()],
    dateValue: new Date(),
    integerArray: [1],
    integerValue: 1,
    numberArray: [1],
    numberValue: 1,
    objectArray: [{ value: 'some' }],
    objectValue: { value: 'some' },
    stringArray: ['some'],
    stringValue: 'some',
  };

  const transformedValue = plainToInstance(
    CreateSampleDto,
    deepClone(plainValue),
  );

  it('should initialize', () => {
    expect(new CreateSampleDto()).toBeDefined();
  });

  it('should initialize with class-transformer', () => {
    expect(transformedValue.booleanArray).toEqual(plainValue.booleanArray);
    expect(transformedValue.booleanValue).toEqual(plainValue.booleanValue);
    expect(transformedValue.dateArray).toEqual(
      plainValue.dateArray.map((d) => d.toISOString()),
    );
    expect(transformedValue.dateValue).toEqual(
      plainValue.dateValue.toISOString(),
    );
    expect(transformedValue.integerArray).toEqual(plainValue.integerArray);
    expect(transformedValue.integerValue).toEqual(plainValue.integerValue);
    expect(transformedValue.numberArray).toEqual(plainValue.numberArray);
    expect(transformedValue.numberValue).toEqual(plainValue.numberValue);
    expect(transformedValue.objectArray).toEqual(plainValue.objectArray);
    expect(transformedValue.objectValue).toEqual(plainValue.objectValue);
    expect(transformedValue.stringArray).toEqual(plainValue.stringArray);
    expect(transformedValue.stringValue).toEqual(plainValue.stringValue);
  });
});

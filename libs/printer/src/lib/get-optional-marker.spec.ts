import { PropertyOptions } from '@puq/type';
import { getOptionalMarker } from './get-optional-marker.js'; // Adjust import path as needed

describe('getOptionalMarker', () => {
  // Basic functionality tests
  it('returns empty string when required is true', () => {
    const result = getOptionalMarker({ required: true });
    expect(result).toBe('');
  });

  it('returns question mark when required is false', () => {
    const result = getOptionalMarker({ required: false });
    expect(result).toBe('?');
  });

  it('returns question mark when required is undefined', () => {
    const result = getOptionalMarker({} as { required?: boolean });
    expect(result).toBe('?');
  });

  // Type safety tests
  it('works with minimal required property', () => {
    const options: Pick<PropertyOptions, 'required'> = { required: true };
    const result = getOptionalMarker(options);
    expect(result).toBe('');
  });

  // Edge cases
  it('handles null required value', () => {
    const result = getOptionalMarker({ required: null } as any);
    expect(result).toBe('?');
  });

  it('handles explicit undefined required value', () => {
    const result = getOptionalMarker({ required: undefined });
    expect(result).toBe('?');
  });

  // Practical usage examples
  describe('in type construction', () => {
    it('creates required property name', () => {
      const propName = `name${getOptionalMarker({ required: true })}`;
      expect(propName).toBe('name');
    });

    it('creates optional property name', () => {
      const propName = `age${getOptionalMarker({ required: false })}`;
      expect(propName).toBe('age?');
    });
  });
});

import { Logger, Provider } from '@nestjs/common';
import { provideLogger } from './provider.js';

describe('Logger Provider', () => {
  let provider: Provider;
  class SampleClass {}

  beforeAll(() => {
    provider = provideLogger(SampleClass, Logger);
  });

  it('should create the provider', () => {
    expect(provider);
  });
});

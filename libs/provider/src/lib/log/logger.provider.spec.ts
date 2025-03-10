import { Injectable, Logger } from '@nestjs/common';
import { InjectLogger, provideLoggerFor } from './logger.provider.js';
import { Test, TestingModule } from '@nestjs/testing';

describe('Logger Provider', () => {
  let app: TestingModule;

  let serviceOne: ServiceOne;
  let serviceTwo: ServiceTwo;

  class CustomLogger extends Logger {}

  @Injectable()
  class ServiceOne {
    constructor(@InjectLogger() public readonly logger: Logger) {}

    log() {
      this.logger.log('some logs');
    }
  }

  @Injectable()
  class ServiceTwo {
    constructor(@InjectLogger() public readonly logger: Logger) {}

    log(@InjectLogger() logger: Logger) {
      this.logger.log('some logs');
    }
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        { provide: Logger, useClass: CustomLogger },
        provideLoggerFor(ServiceOne),
        provideLoggerFor(ServiceTwo),
        ServiceOne,
        ServiceTwo,
      ],
    }).compile();

    serviceOne = app.get(ServiceOne);
    serviceTwo = app.get(ServiceTwo);

    serviceOne.logger.fatal('some fatal message');
    serviceTwo.logger.fatal('some fatal message');
  });

  it('should initialize loggers', () => {
    expect(serviceOne).toBeDefined();
    expect(serviceTwo).toBeDefined();
    expect(serviceOne.logger).toBeDefined();
    expect(serviceTwo.logger).toBeDefined();
    expect(serviceOne.logger.log).toBeDefined();
    expect(serviceTwo.logger.log).toBeDefined();
  });
});

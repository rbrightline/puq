describe('Create an instance', () => {
  class SampleLogger {
    constructor(protected readonly context: string) {}
    public ctx(): string {
      return this.context;
    }
  }
  it('should create a new instance of sample', () => {
    const logger = new SampleLogger('SomeContext');

    expect(logger.ctx()).toEqual('SomeContext');

    const newLogger = new (logger.constructor as typeof SampleLogger)(
      'NewContext',
    );

    expect(newLogger.ctx()).toEqual('NewContext');
  });
});

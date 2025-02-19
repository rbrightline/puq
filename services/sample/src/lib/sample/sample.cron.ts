import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectLogger } from '@puq/core';

@Injectable()
export class SampleCron {
  constructor(@InjectLogger(SampleCron) protected readonly logger: Logger) {}
  @Cron(CronExpression.EVERY_SECOND)
  alive() {
    this.logger.debug('Updated 11');
  }
}

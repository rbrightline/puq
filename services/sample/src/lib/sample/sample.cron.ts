import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SampleCron {
  @Cron(CronExpression.EVERY_SECOND)
  alive() {
    Logger.debug('CronExpression.EVERY_SECOND');
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { fail } from 'assert';
import { ErrorCode } from './common/error-code.js';
import * as ThrowsersMap from './throwers-map.js';

describe('Throwsers Map', () => {
  it('should map each error code', () => {
    Object.values(ErrorCode)
      .filter((e) => typeof e == 'string')
      .forEach((k) => {
        if ((ThrowsersMap as any)[`throw${k}Error`]) return;

        fail(`${k} is not mapped`);
      });
  });
});

import { Controller, Get } from '@nestjs/common';

@Controller()
export class SampleController {
  @Get('hello')
  hello() {
    return 'Updated 512312';
  }
}

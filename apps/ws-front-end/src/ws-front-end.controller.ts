import { Controller, Get } from '@nestjs/common';
import { WsFrontEndService } from './ws-front-end.service';

@Controller()
export class WsFrontEndController {
  constructor(private readonly wsFrontEndService: WsFrontEndService) {}

  @Get()
  getHello(): string {
    return this.wsFrontEndService.getHello();
  }
}

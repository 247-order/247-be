import { Controller, Get } from '@nestjs/common';
import { WsRestApiService } from './ws-rest-api.service';

@Controller()
export class WsRestApiController {
  constructor(private readonly wsRestApiService: WsRestApiService) {}

  @Get()
  getHello(): string {
    return this.wsRestApiService.getHello();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class WsRestApiService {
  getHello(): string {
    return 'Hello World!';
  }
}

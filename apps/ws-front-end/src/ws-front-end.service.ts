import { Injectable } from '@nestjs/common';

@Injectable()
export class WsFrontEndService {
  getHello(): string {
    return 'Hello World!';
  }
}

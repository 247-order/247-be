import { Module } from '@nestjs/common';
import { WsFrontEndController } from './ws-front-end.controller';
import { WsFrontEndService } from './ws-front-end.service';

@Module({
  imports: [
  ],
  controllers: [WsFrontEndController],
  providers: [WsFrontEndService],
})
export class WsFrontEndModule {}

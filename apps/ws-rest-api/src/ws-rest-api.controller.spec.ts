import { Test, TestingModule } from '@nestjs/testing';
import { WsRestApiController } from './ws-rest-api.controller';
import { WsRestApiService } from './ws-rest-api.service';

describe('WsRestApiController', () => {
  let wsRestApiController: WsRestApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WsRestApiController],
      providers: [WsRestApiService],
    }).compile();

    wsRestApiController = app.get<WsRestApiController>(WsRestApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wsRestApiController.getHello()).toBe('Hello World!');
    });
  });
});

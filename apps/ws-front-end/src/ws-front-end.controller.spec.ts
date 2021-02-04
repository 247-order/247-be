import { Test, TestingModule } from '@nestjs/testing';
import { WsFrontEndController } from './ws-front-end.controller';
import { WsFrontEndService } from './ws-front-end.service';

describe('WsFrontEndController', () => {
  let wsFrontEndController: WsFrontEndController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WsFrontEndController],
      providers: [WsFrontEndService],
    }).compile();

    wsFrontEndController = app.get<WsFrontEndController>(WsFrontEndController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wsFrontEndController.getHello()).toBe('Hello World!');
    });
  });
});

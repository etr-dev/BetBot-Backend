import { Test, TestingModule } from '@nestjs/testing';
import { BetbotController } from './betbot.controller';
import { BetbotService } from './betbot.service';

describe('BetbotController', () => {
  let controller: BetbotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetbotController],
      providers: [BetbotService],
    }).compile();

    controller = module.get<BetbotController>(BetbotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

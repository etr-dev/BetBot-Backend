import { Test, TestingModule } from '@nestjs/testing';
import { BetbotService } from '../src/betbot/betbot.service';

describe('BetbotService', () => {
  let service: BetbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetbotService],
    }).compile();

    service = module.get<BetbotService>(BetbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

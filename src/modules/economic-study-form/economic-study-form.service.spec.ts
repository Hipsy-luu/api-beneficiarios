import { Test, TestingModule } from '@nestjs/testing';
import { EconomicStudyFormService } from './economic-study-form.service';

describe('EconomicStudyFormService', () => {
  let service: EconomicStudyFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EconomicStudyFormService],
    }).compile();

    service = module.get<EconomicStudyFormService>(EconomicStudyFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

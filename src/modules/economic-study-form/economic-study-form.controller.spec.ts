import { Test, TestingModule } from '@nestjs/testing';
import { EconomicStudyFormController } from './economic-study-form.controller';

describe('EconomicStudyForm Controller', () => {
  let controller: EconomicStudyFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EconomicStudyFormController],
    }).compile();

    controller = module.get<EconomicStudyFormController>(EconomicStudyFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

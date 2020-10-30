import { Module } from '@nestjs/common';
import { EconomicStudyFormController } from './economic-study-form.controller';
import { EconomicStudyFormService } from './economic-study-form.service';
import { DatabaseModule } from '../../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { beneficiaryProviders } from '../../models/repositoriesModels/beneficiary.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';
import { economicStudyFormProviders } from '../../models/repositoriesModels/economicStudyForm.providers';
import { familyBeneficiarysProviders } from '../../models/repositoriesModels/familyBeneficiarys.providers';
import { evidenceImagesProviders } from '../../models/repositoriesModels/evidenceImages.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [EconomicStudyFormService],
  controllers: [EconomicStudyFormController],
  providers: [
    EconomicStudyFormService, 
    ...beneficiaryProviders,
    ...userProviders,
    ...economicStudyFormProviders,
    ...familyBeneficiarysProviders,
    ...evidenceImagesProviders
  ],
})
export class EconomicStudyFormModule {}

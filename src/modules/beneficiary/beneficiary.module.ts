import { userProviders } from './../../models/repositoriesModels/user.providers';
import { Module } from '@nestjs/common';
import { BeneficiaryController } from './beneficiary.controller';
import { BeneficiaryService } from './beneficiary.service';
import { DatabaseModule } from '../../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { beneficiaryProviders } from '../../models/repositoriesModels/beneficiary.providers';
import { economicStudyFormProviders } from '../../models/repositoriesModels/economicStudyForm.providers';
import { familyBeneficiarysProviders } from '../../models/repositoriesModels/familyBeneficiarys.providers';
import { evidenceImagesProviders } from '../../models/repositoriesModels/evidenceImages.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [BeneficiaryService],
  controllers: [BeneficiaryController],
  providers: [
    BeneficiaryService, 
    ...beneficiaryProviders,
    ...userProviders,
    ...economicStudyFormProviders,
    ...familyBeneficiarysProviders,
    ...evidenceImagesProviders
  ],
})
export class BeneficiaryModule {}

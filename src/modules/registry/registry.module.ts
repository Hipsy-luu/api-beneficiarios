import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { DatabaseModule } from '../../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { beneficiaryProviders } from '../../models/repositoriesModels/beneficiary.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';
import { economicStudyFormProviders } from '../../models/repositoriesModels/economicStudyForm.providers';
import { familyBeneficiarysProviders } from '../../models/repositoriesModels/familyBeneficiarys.providers';
import { evidenceImagesProviders } from '../../models/repositoriesModels/evidenceImages.providers';
import { registryProviders } from '../../models/repositoriesModels/registry.providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [RegistryService],
  controllers: [RegistryController],
  providers: [
    RegistryService, 
    ...beneficiaryProviders,
    ...userProviders,
    ...economicStudyFormProviders,
    ...familyBeneficiarysProviders,
    ...evidenceImagesProviders,
    ...registryProviders,
  ],
})
export class RegistryModule {}

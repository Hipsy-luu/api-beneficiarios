import { Sequelize } from 'sequelize-typescript';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */
//import { SEQUELIZE } from '../utils/constants';
import { User } from '../models/users.entity';
import { Beneficiary } from '../models/beneficiary.entity';
import { EconomicStudyForm } from '../models/economicStudyForm.entity';
import { FamilyBeneficiarys } from '../models/familyBeneficiarys.entity';
import { EvidenceImages } from '../models/evidenceImages.entity';
import { Registry } from '../models/registry.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        define: {
          timestamps: false,
        },
        logging: false,
        host: 'localhost',
        port: 3306,
        username: 'beneficiarios_user',
        password: '9AYRfGMo7HX2eN1e',
        database: 'beneficiarios_bd',
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to
       * Sequelize later on.
       */
      sequelize.addModels([
        User,
        Beneficiary,
        EconomicStudyForm,
        FamilyBeneficiarys,
        EvidenceImages,
        Registry
      ]);

      await sequelize.sync();

      return sequelize;
    },
  },
];

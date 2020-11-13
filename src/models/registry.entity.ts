import { User } from './users.entity';
import { FamilyBeneficiarys } from './familyBeneficiarys.entity';
//import { Sequelize, DataType } from 'sequelize';

import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  CreatedAt,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Beneficiary } from './beneficiary.entity';
import { EconomicStudyForm } from './economicStudyForm.entity';

@Table({
  tableName: 'registry',
  timestamps: false
})
export class Registry extends Model<Registry> {
  //Ejemplo
  /* @Column({
    type: DataType.BOOLEAN, DataType.INTEGER({ length: 11 }), DataType.STRING(45), DataType.DATE,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    defaultValue: false,
    validate: { // DOC : https://sequelize.org/master/manual/validations-and-constraints.html
      notEmpty: {
        msg: 'Please enter your name'
      }
    },
    field: 'have_image',
    
  })
  haveImage: string; */

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'idRegistry',
  })
  idRegistry: number;

  @ForeignKey(() => Beneficiary)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idBeneficiary',
  })
  idBeneficiary: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'year',
  })
  year: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'month',
  })
  month: string;

  @ForeignKey(() => FamilyBeneficiarys)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idFamilyBeneficiarys',
  })
  idFamilyBeneficiarys: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'pickUpPantry',
  })
  pickUpPantry: boolean;
  
  @Column({
    type: DataType.STRING(1500),
    allowNull: false,
    field: 'justification',
  })
  justification: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idUserRegister',
  })
  idUserRegister : number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'createdAt',
  })
  createdAt: Date;

  @BelongsTo(() => Beneficiary, 'idBeneficiary')
  beneficiary: Beneficiary;

  @BelongsTo(() => FamilyBeneficiarys, 'idFamilyBeneficiarys')
  familyBeneficiary: FamilyBeneficiarys;

  @BelongsTo(() => User, 'idUserRegister')
  userRegister: User;
}

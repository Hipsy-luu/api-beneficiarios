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
  tableName: 'familyBeneficiarys',
  timestamps: false
})
export class FamilyBeneficiarys extends Model<FamilyBeneficiarys> {
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
    field: 'idFamilyBeneficiarys',
  })
  idFamilyBeneficiarys: number;

  @ForeignKey(() => EconomicStudyForm)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idEconomicStudyForm',
  })
  idEconomicStudyForm: number;

  @Column({
    type:  DataType.STRING(100),
    allowNull: true,
    defaultValue : "",
    field: 'name',
  })
  name: string;

  @Column({
    type:  DataType.STRING(100),
    allowNull: true,
    defaultValue : "",
    field: 'lastName',
  })
  lastName: string;

  @Column({
    type:  DataType.STRING(100),
    allowNull: true,
    defaultValue : "",
    field: 'motherLastName',
  })
  motherLastName: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : 0,
    field: 'gender',
  })
  gender: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'birthDay',
  })
  birthDay: Date;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : -1,
    field: 'scholarship',
  })
  scholarship: number;

  @Column({
    type:  DataType.STRING(200),
    allowNull: true,
    defaultValue : "",
    field: 'occupation',
  })
  occupation: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : -1,
    field: 'civilState',
  })
  civilState: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : -1,
    field: 'relationship',
  })
  relationship: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : -1,
    field: 'input',
  })
  input: number;

  @BelongsTo(() => EconomicStudyForm, 'idEconomicStudyForm')
  economicStudyForm: EconomicStudyForm;
}

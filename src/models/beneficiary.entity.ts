//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';

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
import { User } from './users.entity';
import { EconomicStudyForm } from './economicStudyForm.entity';

@Table({
  tableName: 'beneficiarys',
  timestamps : false
})
export class Beneficiary extends Model<Beneficiary> {
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
    field: 'idBeneficiary',
  })
  idBeneficiary: number;

  @Column({
    type:  DataType.STRING(100),
    allowNull: false,
    field: 'name',
  })
  name: string;

  @Column({
    type:  DataType.STRING(100),
    allowNull: false,
    field: 'lastName',
  })
  lastName: string;
  
  @Column({
    type:  DataType.STRING(100),
    allowNull: false,
    field: 'motherLastName',
  })
  motherLastName: string;
  
  @Column({
    type:  DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue : 0,
    field: 'gender',
  })
  gender: number;
  
  @Column({
    type:  DataType.DATE,
    allowNull: false,
    field: 'birthDay',
  })
  birthDay: Date;
  
  @Column({
    type:  DataType.STRING(100),
    allowNull: false,
    field: 'phone1',
  })
  phone1: string;
  
  @Column({
    type:  DataType.STRING(100),
    allowNull: true,
    defaultValue : "",
    field: 'phone2',
  })
  phone2: string;
  
  @Column({
    type:  DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue : -1,
    field: 'civilStatus',
  })
  civilStatus: number;
  
  @Column({
    type:  DataType.STRING(300),
    allowNull: false,
    field: 'occupation',
  })
  occupation: string;
  
  @Column({
    type:  DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue : -1,
    field: 'scholarship',
  })
  scholarship: number;
  
  @Column({
    type:  DataType.STRING(150),
    allowNull: false,
    field: 'curp',
  })
  curp: string;
  
  @Column({
    type:  DataType.STRING(150),
    allowNull: true,
    defaultValue : "",
    field: 'rfc',
  })
  rfc: string;

  @Column({
    type:  DataType.BOOLEAN,
    allowNull: false,
    defaultValue : true,
    field: 'active',
  })
  active : boolean;
  
  @ForeignKey(() => User)
  @Column({
    type:  DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idUserRegister',
  })
  idUserRegister : number;
  
  @Column({
    type:  DataType.BOOLEAN,
    allowNull: false,
    defaultValue : false,
    field: 'haveImage',
  })
  haveImage: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'createDate',
  })
  createDate: Date;

  @BelongsTo(() => User, 'idUserRegister')
  user: User;

  @HasMany(()=> EconomicStudyForm , 'idBeneficiary')
  economicStudyForms : EconomicStudyForm[];
}

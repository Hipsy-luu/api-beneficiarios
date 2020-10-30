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
import { FamilyBeneficiarys } from './familyBeneficiarys.entity';
import { EvidenceImages } from './evidenceImages.entity';

@Table({
  tableName: 'economicStudyForm',
  timestamps: false
})
export class EconomicStudyForm extends Model<EconomicStudyForm> {
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
    field: 'idEconomicStudyForm',
  })
  idEconomicStudyForm: number;

  @ForeignKey(() => Beneficiary)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idBeneficiary',
  })
  idBeneficiary: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'medicalService',
  })
  medicalService: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveDisability',
  })
  haveDisability: boolean;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    defaultValue: "",
    field: 'causeDisability',
  })
  causeDisability: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    defaultValue: "",
    field: 'disabilityTime',
  })
  disabilityTime: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveChronicDisease',
  })
  haveChronicDisease: boolean;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'chronicDiseaseType',
  })
  chronicDiseaseType: number;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
    defaultValue: "",
    field: 'other',
  })
  other: string;


  //Domicilio
  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    defaultValue: "",
    field: 'colony',
  })
  colony: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    defaultValue: "",
    field: 'street',
  })
  street: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    defaultValue: "",
    field: 'number',
  })
  number: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    defaultValue: "",
    field: 'postalCode',
  })
  postalCode: string;

  @Column({
    type: DataType.STRING(400),
    allowNull: true,
    defaultValue: "",
    field: 'references',
  })
  references: string;

  //Vivienda
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'typeHousing',
  })
  typeHousing: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'numberRooms',
  })
  numberRooms: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'numberBathrooms',
  })
  numberBathrooms: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'numberBedrooms',
  })
  numberBedrooms: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'housingConditions',
  })
  housingConditions: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'floor',
  })
  floor: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'ceiling',
  })
  ceiling: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'termsFurniture',
  })
  termsFurniture: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: -1,
    field: 'timeAtHome',
  })
  timeAtHome: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveStove',
  })
  haveStove: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveCar',
  })
  haveCar: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveFridge',
  })
  haveFridge: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveMicrowave',
  })
  haveMicrowave: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveWashingMachine',
  })
  haveWashingMachine: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveComputer',
  })
  haveComputer: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveTelevision',
  })
  haveTelevision: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: 0,
    field: 'haveAirConditioning',
  })
  haveAirConditioning: boolean;

  @Column({
    type: DataType.STRING(1500),
    allowNull: true,
    defaultValue: "",
    field: 'houseDescription',
  })
  houseDescription: string; //añadir a interfaz

  @Column({
    type: DataType.STRING(1500),
    allowNull: true,
    defaultValue: "",
    field: 'diagnostic',
  })
  diagnostic: string; //añadir a interfaz

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'creationDate',
  })
  creationDate: Date;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: -1,
    field: 'monthlyIncome',
  })
  monthlyIncome: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'monthlyFamilyIncome',
  })
  monthlyFamilyIncome: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'phone',
  })
  phone: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'internet',
  })
  internet: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'gasoline',
  })
  gasoline: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'rent',
  })
  rent: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'monthlyPasses',
  })
  monthlyPasses: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'light',
  })
  light: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'predial',
  })
  predial: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'education',
  })
  education: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'transport',
  })
  transport: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'water',
  })
  water: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'gas',
  })
  gas: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'medicalExpenses',
  })
  medicalExpenses: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'cableTV',
  })
  cableTV: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'dress',
  })
  dress: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'others',
  })
  others: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0,
    field: 'feeding',
  })
  feeding: number;

  @BelongsTo(() => Beneficiary, 'idBeneficiary')
  beneficiary: Beneficiary;

  @HasMany(() => FamilyBeneficiarys, 'idEconomicStudyForm')
  family: FamilyBeneficiarys[];

  @HasMany(() => EvidenceImages, 'idEconomicStudyForm')
  images: EvidenceImages[];
}

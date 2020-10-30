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
  tableName: 'evidenceImages',
  timestamps: false
})
export class EvidenceImages extends Model<EvidenceImages> {
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
    field: 'idEvidenceImages',
  })
  idEvidenceImages: number;

  @ForeignKey(() => EconomicStudyForm)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'idEconomicStudyForm',
  })
  idEconomicStudyForm: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue : -1,
    field: 'type',
  })
  type: number;

  @BelongsTo(() => EconomicStudyForm, 'idEconomicStudyForm')
  economicStudyForm: EconomicStudyForm;
}

import { Beneficiary } from './../../models/beneficiary.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../models/users.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { EconomicStudyFormService } from '../economic-study-form/economic-study-form.service';
import { EconomicStudyForm } from '../../models/economicStudyForm.entity';
import { FamilyBeneficiarys } from '../../models/familyBeneficiarys.entity';
import { EvidenceImages } from '../../models/evidenceImages.entity';
import * as fs from 'fs';

@Injectable()
export class BeneficiaryService {
    constructor(
        private readonly mailerService: MailerService,
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('BeneficiaryRepository') private readonly beneficiaryRepository: typeof Beneficiary,

    ) { }

    async createBeneficiary(newBeneficiaryData: Beneficiary): Promise<ServerMessages> {
        if (
            newBeneficiaryData.name == null ||
            newBeneficiaryData.name == undefined ||
            newBeneficiaryData.lastName == null ||
            newBeneficiaryData.lastName == undefined ||
            newBeneficiaryData.motherLastName == null ||
            newBeneficiaryData.motherLastName == undefined ||
            newBeneficiaryData.gender == null ||
            newBeneficiaryData.gender == undefined ||
            newBeneficiaryData.birthDay == null ||
            newBeneficiaryData.birthDay == undefined ||
            newBeneficiaryData.phone1 == null ||
            newBeneficiaryData.phone1 == undefined ||
            newBeneficiaryData.phone2 == null ||
            newBeneficiaryData.phone2 == undefined ||
            newBeneficiaryData.civilStatus == null ||
            newBeneficiaryData.civilStatus == undefined ||
            newBeneficiaryData.occupation == null ||
            newBeneficiaryData.occupation == undefined ||
            newBeneficiaryData.scholarship == null ||
            newBeneficiaryData.scholarship == undefined ||
            newBeneficiaryData.curp == null ||
            newBeneficiaryData.curp == undefined ||
            newBeneficiaryData.rfc == null ||
            newBeneficiaryData.rfc == undefined ||
            newBeneficiaryData.active == null ||
            newBeneficiaryData.active == undefined ||
            newBeneficiaryData.idUserRegister == null ||
            newBeneficiaryData.idUserRegister == undefined ||
            newBeneficiaryData.haveImage == null ||
            newBeneficiaryData.haveImage == undefined ||
            newBeneficiaryData.createDate == null ||
            newBeneficiaryData.createDate == undefined
        ) {
            return new ServerMessages(true, 'Petición incompleta', {});
        }

        try {
            //END
            var newBeneficiary: Beneficiary = await this.beneficiaryRepository.create<Beneficiary>({
                name: newBeneficiaryData.name,
                lastName: newBeneficiaryData.lastName,
                motherLastName: newBeneficiaryData.motherLastName,
                gender: newBeneficiaryData.gender,
                birthDay: newBeneficiaryData.birthDay,
                phone1: newBeneficiaryData.phone1,
                phone2: newBeneficiaryData.phone2,
                civilStatus: newBeneficiaryData.civilStatus,
                occupation: newBeneficiaryData.occupation,
                scholarship: newBeneficiaryData.scholarship,
                curp: newBeneficiaryData.curp,
                rfc: newBeneficiaryData.rfc,
                active: newBeneficiaryData.active,
                idUserRegister: newBeneficiaryData.idUserRegister,
                haveImage: newBeneficiaryData.haveImage,
                createDate: newBeneficiaryData.createDate,
            }, {});
            return new ServerMessages(false, 'Beneficiario creado con éxito', newBeneficiary);

        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error', error);
        }
    }

    async updateBeneficiary(updatedBeneficiary: Beneficiary): Promise<ServerMessages> {
        if (
            updatedBeneficiary.idBeneficiary == null ||
            updatedBeneficiary.idBeneficiary == undefined ||
            updatedBeneficiary.name == null ||
            updatedBeneficiary.name == undefined ||
            updatedBeneficiary.lastName == null ||
            updatedBeneficiary.lastName == undefined ||
            updatedBeneficiary.motherLastName == null ||
            updatedBeneficiary.motherLastName == undefined ||
            updatedBeneficiary.gender == null ||
            updatedBeneficiary.gender == undefined ||
            updatedBeneficiary.birthDay == null ||
            updatedBeneficiary.birthDay == undefined ||
            updatedBeneficiary.phone1 == null ||
            updatedBeneficiary.phone1 == undefined ||
            updatedBeneficiary.phone2 == null ||
            updatedBeneficiary.phone2 == undefined ||
            updatedBeneficiary.civilStatus == null ||
            updatedBeneficiary.civilStatus == undefined ||
            updatedBeneficiary.occupation == null ||
            updatedBeneficiary.occupation == undefined ||
            updatedBeneficiary.scholarship == null ||
            updatedBeneficiary.scholarship == undefined ||
            updatedBeneficiary.curp == null ||
            updatedBeneficiary.curp == undefined ||
            updatedBeneficiary.rfc == null ||
            updatedBeneficiary.rfc == undefined ||
            updatedBeneficiary.active == null ||
            updatedBeneficiary.active == undefined ||
            updatedBeneficiary.idUserRegister == null ||
            updatedBeneficiary.idUserRegister == undefined ||
            updatedBeneficiary.haveImage == null ||
            updatedBeneficiary.haveImage == undefined ||
            updatedBeneficiary.createDate == null ||
            updatedBeneficiary.createDate == undefined
        ) {
            return new ServerMessages(true, 'Petición incompleta', {});
        }

        var beneficiaryToUpdate: Beneficiary = await this.beneficiaryRepository.findOne<Beneficiary>({
            where: { idBeneficiary: updatedBeneficiary.idBeneficiary },
        });

        if (!beneficiaryToUpdate) {
            return new ServerMessages(true, 'El beneficiario no esta disponible', beneficiaryToUpdate);
        }

        try {
            beneficiaryToUpdate.name = updatedBeneficiary.name;
            beneficiaryToUpdate.lastName = updatedBeneficiary.lastName;
            beneficiaryToUpdate.motherLastName = updatedBeneficiary.motherLastName;
            beneficiaryToUpdate.gender = updatedBeneficiary.gender;
            beneficiaryToUpdate.birthDay = updatedBeneficiary.birthDay;
            beneficiaryToUpdate.phone1 = updatedBeneficiary.phone1;
            beneficiaryToUpdate.phone2 = updatedBeneficiary.phone2;
            beneficiaryToUpdate.civilStatus = updatedBeneficiary.civilStatus;
            beneficiaryToUpdate.occupation = updatedBeneficiary.occupation;
            beneficiaryToUpdate.scholarship = updatedBeneficiary.scholarship;
            beneficiaryToUpdate.curp = updatedBeneficiary.curp;
            beneficiaryToUpdate.rfc = updatedBeneficiary.rfc;
            beneficiaryToUpdate.active = updatedBeneficiary.active;
            beneficiaryToUpdate.idUserRegister = updatedBeneficiary.idUserRegister;
            beneficiaryToUpdate.haveImage = updatedBeneficiary.haveImage;
            beneficiaryToUpdate.createDate = updatedBeneficiary.createDate;

            await beneficiaryToUpdate.save();

            return new ServerMessages(false, 'Beneficiario actualizado con éxito', beneficiaryToUpdate);
        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error actualizando el beneficiario', error);
        }
    }

    async getBeneficiaryData(idBeneficiary: number): Promise<ServerMessages> {
        try {
            var beneficiary: Beneficiary = await this.beneficiaryRepository.findOne<Beneficiary>({
                where: { idBeneficiary: idBeneficiary },
                include: [{
                    model: EconomicStudyForm,
                    as: "economicStudyForms",
                    include: [{
                        model: FamilyBeneficiarys,
                        as: "family"
                    }, {
                        model: EvidenceImages,
                        as: "images"
                    }]
                }]
            })
            let economicStudyForms = await beneficiary.economicStudyForms.map((economicStudyForm: EconomicStudyForm) => {
                return Object.assign(
                    {
                        idBeneficiary: economicStudyForm.idBeneficiary,
                        medicalService: economicStudyForm.medicalService,
                        haveDisability: economicStudyForm.haveDisability,
                        causeDisability: economicStudyForm.causeDisability,
                        disabilityTime: economicStudyForm.disabilityTime,
                        haveChronicDisease: economicStudyForm.haveChronicDisease,
                        chronicDiseaseType: economicStudyForm.chronicDiseaseType,
                        other: economicStudyForm.other,
                        colony: economicStudyForm.colony,
                        street: economicStudyForm.street,
                        number: economicStudyForm.number,
                        postalCode: economicStudyForm.postalCode,
                        references: economicStudyForm.references,
                        typeHousing: economicStudyForm.typeHousing,
                        numberRooms: economicStudyForm.numberRooms,
                        numberBathrooms: economicStudyForm.numberBathrooms,
                        numberBedrooms: economicStudyForm.numberBedrooms,
                        housingConditions: economicStudyForm.housingConditions,
                        floor: economicStudyForm.floor,
                        ceiling: economicStudyForm.ceiling,
                        termsFurniture: economicStudyForm.termsFurniture,
                        timeAtHome: economicStudyForm.timeAtHome,
                        haveStove: economicStudyForm.haveStove,
                        haveCar: economicStudyForm.haveCar,
                        haveFridge: economicStudyForm.haveFridge,
                        haveMicrowave: economicStudyForm.haveMicrowave,
                        haveWashingMachine: economicStudyForm.haveWashingMachine,
                        haveComputer: economicStudyForm.haveComputer,
                        haveTelevision: economicStudyForm.haveTelevision,
                        haveAirConditioning: economicStudyForm.haveAirConditioning,
                        houseDescription: economicStudyForm.houseDescription,
                        diagnostic: economicStudyForm.diagnostic,
                        creationDate: economicStudyForm.creationDate,

                        monthlyIncome: economicStudyForm.monthlyIncome,
                        monthlyFamilyIncome: economicStudyForm.monthlyFamilyIncome,
                        phone: economicStudyForm.phone,
                        internet: economicStudyForm.internet,
                        gasoline: economicStudyForm.gasoline,
                        rent: economicStudyForm.rent,
                        monthlyPasses: economicStudyForm.monthlyPasses,
                        light: economicStudyForm.light,
                        predial: economicStudyForm.predial,
                        education: economicStudyForm.education,
                        transport: economicStudyForm.transport,
                        water: economicStudyForm.water,
                        gas: economicStudyForm.gas,
                        medicalExpenses: economicStudyForm.medicalExpenses,
                        cableTV: economicStudyForm.cableTV,
                        dress: economicStudyForm.dress,
                        others: economicStudyForm.others,
                        feeding: economicStudyForm.feeding,


                        family: economicStudyForm.family,
                        images: economicStudyForm.images
                    })
            });
            if (!beneficiary) {
                return new ServerMessages(true, 'El beneficiario no esta disponible', {});
            }
            return new ServerMessages(false, 'Beneficiario obtenido con éxito', {
                beneficiary: {
                    idBeneficiary: beneficiary.idBeneficiary,
                    name: beneficiary.name,
                    lastName: beneficiary.lastName,
                    motherLastName: beneficiary.motherLastName,
                    gender: beneficiary.gender,
                    birthDay: beneficiary.birthDay,
                    phone1: beneficiary.phone1,
                    phone2: beneficiary.phone2,
                    civilStatus: beneficiary.civilStatus,
                    occupation: beneficiary.occupation,
                    scholarship: beneficiary.scholarship,
                    curp: beneficiary.curp,
                    rfc: beneficiary.rfc,
                    active: beneficiary.active,
                    idUserRegister: beneficiary.idUserRegister,
                    haveImage: beneficiary.haveImage,
                    createDate: beneficiary.createDate,
                },
                economicStudyForms: economicStudyForms
            });
        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error obteniendo el beneficiario', error);
        }

    }

    async deleteBeneficiaryData(idBeneficiary: number): Promise<ServerMessages> {
        try {
            var beneficiary: Beneficiary = await this.beneficiaryRepository.findOne<Beneficiary>({
                where: { idBeneficiary: idBeneficiary },
                include: [{
                    model: EconomicStudyForm,
                    as: "economicStudyForms",
                    include: [{
                        model: FamilyBeneficiarys,
                        as: "family"
                    }, {
                        model: EvidenceImages,
                        as: "images"
                    }]
                }]
            });

            if (!beneficiary) {
                return new ServerMessages(true, 'El beneficiario no esta disponible', {});
            }
            let resultDeletes = [];

            for (let index = 0; index < beneficiary.economicStudyForms.length; index++) {
                for (let indexx = 0; indexx < beneficiary.economicStudyForms[index].family.length; indexx++) {
                    let resultDelete = await beneficiary.economicStudyForms[index].family[indexx].destroy();
                    resultDeletes.push(resultDelete);
                }

                for (let indexx = 0; indexx < beneficiary.economicStudyForms[index].images.length; indexx++) {

                    await this.deleteImageFormEvidence(
                        beneficiary.economicStudyForms[index].idEconomicStudyForm.toString(),
                        beneficiary.economicStudyForms[index].images[indexx].idEvidenceImages.toString())
                    let resultDelete = await beneficiary.economicStudyForms[index].images[indexx].destroy();
                    resultDeletes.push(resultDelete);
                }

                let path = 'storage/forms/' + beneficiary.economicStudyForms[index].idEconomicStudyForm + '/';
                    if (fs.existsSync(path)) {
                        fs.rmdirSync(path);
                    }

                let resultDelete = await beneficiary.economicStudyForms[index].destroy();
                resultDeletes.push(resultDelete);
            }

            await this.deleteImageBeneficiary(beneficiary.idBeneficiary.toString());

            let resultDelete = await beneficiary.destroy();
            resultDeletes.push(resultDelete);

            return new ServerMessages(false, 'Beneficiario eliminado con éxito', resultDeletes);
        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error eliminando el beneficiario', error);
        }
    }

    async deleteImageBeneficiary(idBeneficiary: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            fs.unlink('storage/beneficiary/' + idBeneficiary + '.jpg', async (error) => {
                if (error) {
                    resolve(new ServerMessages(true, "Imagen no existe.", {}));
                } else {
                    resolve(new ServerMessages(false, "Se elimino correctamente la imagen del beneficiario " + idBeneficiary, {}));
                };
            });
        })
    }

    async deleteImageFormEvidence(idEconomicStudyForm: string, idEvidenceImages: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            fs.unlink('storage/forms/' + idEconomicStudyForm + '/' + idEvidenceImages + '.jpg', async (error) => {
                if (error) {
                    resolve(new ServerMessages(true, "Imagen no existe.", {}));
                } else {
                    resolve(new ServerMessages(
                        false,
                        "Se elimino correctamente la imagen de evidencia " + idEvidenceImages,
                        idEvidenceImages));
                };
            });
        })
    }

    async getBeneficiarysList(): Promise<ServerMessages> {
        try {
            var beneficiarysList: Beneficiary[] = await this.beneficiaryRepository.findAll<Beneficiary>({
                attributes: ['idBeneficiary', 'name', 'lastName', 'motherLastName', 'haveImage'],
            });
            return new ServerMessages(false, 'Lista de beneficiarios obtenida', beneficiarysList);
        } catch (error) {
            return new ServerMessages(true, 'Error obteniendo lista de beneficiarios', {});
        }
    }
}

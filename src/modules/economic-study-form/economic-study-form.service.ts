import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../models/users.entity';
import { Beneficiary } from '../../models/beneficiary.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { EconomicStudyForm } from '../../models/economicStudyForm.entity';
import { FamilyBeneficiarys } from '../../models/familyBeneficiarys.entity';
import { EvidenceImages } from '../../models/evidenceImages.entity';

@Injectable()
export class EconomicStudyFormService {
    constructor(
        private readonly mailerService: MailerService,
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('BeneficiaryRepository') private readonly beneficiaryRepository: typeof Beneficiary,
        @Inject('EconomicStudyFormRepository') private readonly economicStudyFormRepository: typeof EconomicStudyForm,
        @Inject('FamilyBeneficiarysRepository') private readonly familyBeneficiarysRepository: typeof FamilyBeneficiarys,
        @Inject('EvidenceImagesRepository') private readonly evidenceImagesRepository: typeof EvidenceImages,
    ) { }

    async createEconomicStudyForm(newEconomicStudyFormData: EconomicStudyForm): Promise<ServerMessages> {
        if (
            newEconomicStudyFormData.idBeneficiary == null ||
            newEconomicStudyFormData.idBeneficiary == undefined ||
            newEconomicStudyFormData.medicalService == null ||
            newEconomicStudyFormData.medicalService == undefined ||
            newEconomicStudyFormData.haveDisability == null ||
            newEconomicStudyFormData.haveDisability == undefined ||
            newEconomicStudyFormData.causeDisability == null ||
            newEconomicStudyFormData.causeDisability == undefined ||
            newEconomicStudyFormData.disabilityTime == null ||
            newEconomicStudyFormData.disabilityTime == undefined ||
            newEconomicStudyFormData.haveChronicDisease == null ||
            newEconomicStudyFormData.haveChronicDisease == undefined ||
            newEconomicStudyFormData.chronicDiseaseType == null ||
            newEconomicStudyFormData.chronicDiseaseType == undefined ||
            newEconomicStudyFormData.other == null ||
            newEconomicStudyFormData.other == undefined ||
            newEconomicStudyFormData.colony == null ||
            newEconomicStudyFormData.colony == undefined ||
            newEconomicStudyFormData.street == null ||
            newEconomicStudyFormData.street == undefined ||
            newEconomicStudyFormData.number == null ||
            newEconomicStudyFormData.number == undefined ||
            newEconomicStudyFormData.postalCode == null ||
            newEconomicStudyFormData.postalCode == undefined ||
            newEconomicStudyFormData.references == null ||
            newEconomicStudyFormData.references == undefined ||
            newEconomicStudyFormData.typeHousing == null ||
            newEconomicStudyFormData.typeHousing == undefined ||
            newEconomicStudyFormData.numberRooms == null ||
            newEconomicStudyFormData.numberRooms == undefined ||
            newEconomicStudyFormData.numberBathrooms == null ||
            newEconomicStudyFormData.numberBathrooms == undefined ||
            newEconomicStudyFormData.numberBedrooms == null ||
            newEconomicStudyFormData.numberBedrooms == undefined ||
            newEconomicStudyFormData.housingConditions == null ||
            newEconomicStudyFormData.housingConditions == undefined ||
            newEconomicStudyFormData.floor == null ||
            newEconomicStudyFormData.floor == undefined ||
            newEconomicStudyFormData.ceiling == null ||
            newEconomicStudyFormData.ceiling == undefined ||
            newEconomicStudyFormData.termsFurniture == null ||
            newEconomicStudyFormData.termsFurniture == undefined ||
            newEconomicStudyFormData.timeAtHome == null ||
            newEconomicStudyFormData.timeAtHome == undefined ||
            newEconomicStudyFormData.haveStove == null ||
            newEconomicStudyFormData.haveStove == undefined ||
            newEconomicStudyFormData.haveCar == null ||
            newEconomicStudyFormData.haveCar == undefined ||
            newEconomicStudyFormData.haveFridge == null ||
            newEconomicStudyFormData.haveFridge == undefined ||
            newEconomicStudyFormData.haveMicrowave == null ||
            newEconomicStudyFormData.haveMicrowave == undefined ||
            newEconomicStudyFormData.haveWashingMachine == null ||
            newEconomicStudyFormData.haveWashingMachine == undefined ||
            newEconomicStudyFormData.haveComputer == null ||
            newEconomicStudyFormData.haveComputer == undefined ||
            newEconomicStudyFormData.haveTelevision == null ||
            newEconomicStudyFormData.haveTelevision == undefined ||
            newEconomicStudyFormData.haveAirConditioning == null ||
            newEconomicStudyFormData.haveAirConditioning == undefined ||
            newEconomicStudyFormData.houseDescription == null ||
            newEconomicStudyFormData.houseDescription == undefined ||
            newEconomicStudyFormData.diagnostic == null ||
            newEconomicStudyFormData.diagnostic == undefined ||
            newEconomicStudyFormData.creationDate == null ||
            newEconomicStudyFormData.creationDate == undefined ||
            newEconomicStudyFormData.family == null ||
            newEconomicStudyFormData.family == undefined ||
            newEconomicStudyFormData.monthlyIncome == null ||
            newEconomicStudyFormData.monthlyIncome == undefined ||
            newEconomicStudyFormData.monthlyFamilyIncome == null ||
            newEconomicStudyFormData.monthlyFamilyIncome == undefined ||
            newEconomicStudyFormData.phone == null ||
            newEconomicStudyFormData.phone == undefined ||
            newEconomicStudyFormData.internet == null ||
            newEconomicStudyFormData.internet == undefined ||
            newEconomicStudyFormData.gasoline == null ||
            newEconomicStudyFormData.gasoline == undefined ||
            newEconomicStudyFormData.rent == null ||
            newEconomicStudyFormData.rent == undefined ||
            newEconomicStudyFormData.light == null ||
            newEconomicStudyFormData.light == undefined ||
            newEconomicStudyFormData.predial == null ||
            newEconomicStudyFormData.predial == undefined ||
            newEconomicStudyFormData.education == null ||
            newEconomicStudyFormData.education == undefined ||
            newEconomicStudyFormData.transport == null ||
            newEconomicStudyFormData.transport == undefined ||
            newEconomicStudyFormData.water == null ||
            newEconomicStudyFormData.water == undefined ||
            newEconomicStudyFormData.gas == null ||
            newEconomicStudyFormData.gas == undefined ||
            newEconomicStudyFormData.medicalExpenses == null ||
            newEconomicStudyFormData.medicalExpenses == undefined ||
            newEconomicStudyFormData.cableTV == null ||
            newEconomicStudyFormData.cableTV == undefined ||
            newEconomicStudyFormData.dress == null ||
            newEconomicStudyFormData.dress == undefined ||
            newEconomicStudyFormData.others == null ||
            newEconomicStudyFormData.others == undefined ||
            newEconomicStudyFormData.feeding == null ||
            newEconomicStudyFormData.feeding == undefined
        ) {
            return new ServerMessages(true, 'Petición incompleta', {});
        }

        let error = false;

        //Validaciones de la familia
        for (let index = 0; index < newEconomicStudyFormData.family.length; index++) {
            if (
                newEconomicStudyFormData.family[index].idFamilyBeneficiarys == null ||
                newEconomicStudyFormData.family[index].idFamilyBeneficiarys == undefined ||
                newEconomicStudyFormData.family[index].idEconomicStudyForm == null ||
                newEconomicStudyFormData.family[index].idEconomicStudyForm == undefined ||
                newEconomicStudyFormData.family[index].name == null ||
                newEconomicStudyFormData.family[index].name == undefined ||
                newEconomicStudyFormData.family[index].lastName == null ||
                newEconomicStudyFormData.family[index].lastName == undefined ||
                newEconomicStudyFormData.family[index].motherLastName == null ||
                newEconomicStudyFormData.family[index].motherLastName == undefined ||
                newEconomicStudyFormData.family[index].gender == null ||
                newEconomicStudyFormData.family[index].gender == undefined ||
                newEconomicStudyFormData.family[index].birthDay == null ||
                newEconomicStudyFormData.family[index].birthDay == undefined ||
                newEconomicStudyFormData.family[index].scholarship == null ||
                newEconomicStudyFormData.family[index].scholarship == undefined ||
                newEconomicStudyFormData.family[index].occupation == null ||
                newEconomicStudyFormData.family[index].occupation == undefined ||
                newEconomicStudyFormData.family[index].civilState == null ||
                newEconomicStudyFormData.family[index].civilState == undefined ||
                newEconomicStudyFormData.family[index].relationship == null ||
                newEconomicStudyFormData.family[index].relationship == undefined ||
                newEconomicStudyFormData.family[index].input == null ||
                newEconomicStudyFormData.family[index].input == undefined
            ) {
                error = true;
            }
        }

        if (error == true) {
            return new ServerMessages(true, 'Datos de los familiares incompletos', {});
        }

        //Validacion de que solo se puede crear uno solo
        /* var economicStudyFormList: EconomicStudyForm[] = await this.economicStudyFormRepository.findAll<EconomicStudyForm>({
            // attributes: { exclude: ['password','deleted'] },
            include: [{
                model: Beneficiary,
                as: "beneficiary",
                where: {
                    idBeneficiary: newEconomicStudyFormData.idBeneficiary
                }
            }],
        });
        error = false;
        let actualYear = new Date().getFullYear();
        for (let index = 0; index < economicStudyFormList.length; index++) {
            const currentDateFixed = new Date(economicStudyFormList[index].creationDate).getFullYear();
            if (currentDateFixed.toString() == actualYear.toString()) {
                error = true;
            }
        }

        if (error == true) {
            return new ServerMessages(true, 'Actualmente existe un formulario para el año en curso', {});
        } */

        try {
            //END
            let newData: any = {
                idBeneficiary: newEconomicStudyFormData.idBeneficiary,
                medicalService: newEconomicStudyFormData.medicalService,
                haveDisability: newEconomicStudyFormData.haveDisability,
                causeDisability: newEconomicStudyFormData.causeDisability,
                disabilityTime: newEconomicStudyFormData.disabilityTime,
                haveChronicDisease: newEconomicStudyFormData.haveChronicDisease,
                chronicDiseaseType: newEconomicStudyFormData.chronicDiseaseType,
                other: newEconomicStudyFormData.other,
                colony: newEconomicStudyFormData.colony,
                street: newEconomicStudyFormData.street,
                number: newEconomicStudyFormData.number,
                postalCode: newEconomicStudyFormData.postalCode,
                references: newEconomicStudyFormData.references,
                typeHousing: newEconomicStudyFormData.typeHousing,
                numberRooms: newEconomicStudyFormData.numberRooms,
                numberBathrooms: newEconomicStudyFormData.numberBathrooms,
                numberBedrooms: newEconomicStudyFormData.numberBedrooms,
                housingConditions: newEconomicStudyFormData.housingConditions,
                floor: newEconomicStudyFormData.floor,
                ceiling: newEconomicStudyFormData.ceiling,
                termsFurniture: newEconomicStudyFormData.termsFurniture,
                timeAtHome: newEconomicStudyFormData.timeAtHome,
                haveStove: newEconomicStudyFormData.haveStove,
                haveCar: newEconomicStudyFormData.haveCar,
                haveFridge: newEconomicStudyFormData.haveFridge,
                haveMicrowave: newEconomicStudyFormData.haveMicrowave,
                haveWashingMachine: newEconomicStudyFormData.haveWashingMachine,
                haveComputer: newEconomicStudyFormData.haveComputer,
                haveTelevision: newEconomicStudyFormData.haveTelevision,
                haveAirConditioning: newEconomicStudyFormData.haveAirConditioning,
                houseDescription: newEconomicStudyFormData.houseDescription,
                diagnostic: newEconomicStudyFormData.diagnostic,
                creationDate: newEconomicStudyFormData.creationDate,

                monthlyIncome : newEconomicStudyFormData.monthlyIncome,
                monthlyFamilyIncome : newEconomicStudyFormData.monthlyFamilyIncome,
                phone : newEconomicStudyFormData.phone,
                internet : newEconomicStudyFormData.internet,
                gasoline : newEconomicStudyFormData.gasoline,
                rent : newEconomicStudyFormData.rent,
                monthlyPasses : newEconomicStudyFormData.monthlyPasses,
                light : newEconomicStudyFormData.light,
                predial : newEconomicStudyFormData.predial,
                education : newEconomicStudyFormData.education,
                transport : newEconomicStudyFormData.transport,
                water : newEconomicStudyFormData.water,
                gas : newEconomicStudyFormData.gas,
                medicalExpenses : newEconomicStudyFormData.medicalExpenses,
                cableTV : newEconomicStudyFormData.cableTV,
                dress : newEconomicStudyFormData.dress,
                others : newEconomicStudyFormData.others,
                feeding : newEconomicStudyFormData.feeding
            };
            var newEconomicStudyFormService: EconomicStudyForm = await this.economicStudyFormRepository.create<EconomicStudyForm>(newData, {});
            newData.family = [];
            newData.images = [];

            try {
                for (let index = 0; index < newEconomicStudyFormData.family.length; index++) {
                    var newFamilyBeneficiarys: FamilyBeneficiarys = await this.familyBeneficiarysRepository.create<FamilyBeneficiarys>({
                        idEconomicStudyForm: newEconomicStudyFormService.idEconomicStudyForm,
                        name: newEconomicStudyFormData.family[index].name,
                        lastName: newEconomicStudyFormData.family[index].lastName,
                        motherLastName: newEconomicStudyFormData.family[index].motherLastName,
                        gender: newEconomicStudyFormData.family[index].gender,
                        birthDay: newEconomicStudyFormData.family[index].birthDay,
                        scholarship: newEconomicStudyFormData.family[index].scholarship,
                        occupation: newEconomicStudyFormData.family[index].occupation,
                        civilState: newEconomicStudyFormData.family[index].civilState,
                        relationship: newEconomicStudyFormData.family[index].relationship,
                        input: newEconomicStudyFormData.family[index].input,
                    }, {});
                    newData.family.push(newFamilyBeneficiarys)
                }

                for (let index = 0; index < newEconomicStudyFormData.images.length; index++) {
                    var newImage: EvidenceImages = await this.evidenceImagesRepository.create<EvidenceImages>({
                        idEconomicStudyForm : newEconomicStudyFormService.idEconomicStudyForm,
                        type :  newEconomicStudyFormData.images[index].type
                    }, {});
                    newData.images.push(newImage);
                }

                return new ServerMessages(false, 'Formulario creado con éxito', newData);
            } catch (error) {
                return new ServerMessages(true, 'Formulario creado con éxito pero a ocurrido un error creando los familiares', newData);
            }



        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error creando el formulario', error);
        }
    }
}

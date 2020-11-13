import { Registry } from './../../models/registry.entity';
import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../models/users.entity';
import { Beneficiary } from '../../models/beneficiary.entity';
import { EconomicStudyForm } from '../../models/economicStudyForm.entity';
import { FamilyBeneficiarys } from '../../models/familyBeneficiarys.entity';
import { EvidenceImages } from '../../models/evidenceImages.entity';
import { ServerMessages } from '../../utils/serverMessages.util';

@Injectable()
export class RegistryService {
    constructor(
        private readonly mailerService: MailerService,
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('BeneficiaryRepository') private readonly beneficiaryRepository: typeof Beneficiary,
        @Inject('EconomicStudyFormRepository') private readonly economicStudyFormRepository: typeof EconomicStudyForm,
        @Inject('FamilyBeneficiarysRepository') private readonly familyBeneficiarysRepository: typeof FamilyBeneficiarys,
        @Inject('EvidenceImagesRepository') private readonly evidenceImagesRepository: typeof EvidenceImages,
        @Inject('RegistryRepository') private readonly registryRepository: typeof Registry,
    ) { }

    async createRegistry(newRegistry : Registry): Promise<ServerMessages> {
        if (
            newRegistry.idBeneficiary == null ||
            newRegistry.idBeneficiary == undefined ||
            newRegistry.year == null ||
            newRegistry.year == undefined ||
            newRegistry.month == null ||
            newRegistry.month == undefined ||
            newRegistry.idFamilyBeneficiarys == null ||
            newRegistry.idFamilyBeneficiarys == undefined ||
            newRegistry.pickUpPantry == null ||
            newRegistry.pickUpPantry == undefined ||
            newRegistry.justification == null ||
            newRegistry.justification == undefined ||
            newRegistry.idUserRegister == null ||
            newRegistry.idUserRegister == undefined 
        ) {
            return new ServerMessages(true, 'Petición incompleta', {});
        }

        if(newRegistry.idUserRegister == -1){
            return new ServerMessages(true, 'Usuario que registra invalido', {});
        }
        if(newRegistry.idBeneficiary == -1){
            return new ServerMessages(true, 'Beneficiario invalido', {});
        }

        var alreadyRegister: Registry = await this.registryRepository.findOne<Registry>({
            where: { 
                idBeneficiary : newRegistry.idBeneficiary,
                year: newRegistry.year,
                month: newRegistry.month
            },
        });

        if (alreadyRegister) {
            return new ServerMessages(true, 'Ya se registro esta asistencia', alreadyRegister);
        }

        try {
            //END
            var newCreatedRegistry: Registry = await this.registryRepository.create<Registry>({
                /* idRegistry : newRegistry.idRegistry, */
                idBeneficiary: newRegistry.idBeneficiary,
                year : newRegistry.year,
                month : newRegistry.month,
                idFamilyBeneficiarys : newRegistry.idFamilyBeneficiarys,
                pickUpPantry : newRegistry.pickUpPantry,
                justification : newRegistry.justification,
                idUserRegister : newRegistry.idUserRegister
            }, {});
            return new ServerMessages(false, 'Registro creado con éxito', newCreatedRegistry);

        } catch (error) {
            return new ServerMessages(true, 'A ocurrido un error creando el registro', error);
        }
    }

    async getRegistryListByYear(year : string): Promise<ServerMessages> {
        try {
            var registryList: Registry[] = await this.registryRepository.findAll<Registry>({
                /* attributes: ['idBeneficiary', 'year'], */
                where: { 
                    year: year,
                },
                group: 'idBeneficiary',
                include : [{
                    model : Beneficiary,
                    as : "beneficiary"
                }]
            }).map(async (registry: Registry) => {
                var registryBeneficiary: Registry[] = await this.registryRepository.findAll<Registry>({
                    /* attributes: ['idBeneficiary', 'year'], */
                    where: { 
                        idBeneficiary : registry.idBeneficiary,
                        year: year,
                    },
                    /* include : [{
                        model: FamilyBeneficiarys,
                        as: "familyBeneficiary"
                    }] */
                }).map(async (registry: Registry) => {

                    var personPickUpPantry: FamilyBeneficiarys = await this.familyBeneficiarysRepository.findOne<FamilyBeneficiarys>({
                        where: { 
                            idFamilyBeneficiarys : registry.idFamilyBeneficiarys,
                        },
                    });

                    return Object.assign(
                      {
                        idRegistry: registry.idRegistry,
                        idBeneficiary: registry.idBeneficiary,
                        year: registry.year,
                        month: registry.month,
                        idFamilyBeneficiarys: registry.idFamilyBeneficiarys,
                        pickUpPantry: registry.pickUpPantry,
                        justification: registry.justification,
                        idUserRegister: registry.idUserRegister,
                        createdAt: registry.createdAt,
                        personPickUpPantry : personPickUpPantry
                      })
                  });
                //console.log(registryBeneficiary.find((registry : Registry )=>{ return registry.month == "julio" }));
                
                return Object.assign(
                  {
                    idRegistry : registry.idRegistry,
                    idBeneficiary : registry.idBeneficiary,
                    fullName : registry.beneficiary.name + " " +registry.beneficiary.lastName + " " +registry.beneficiary.motherLastName,
                    haveImage : registry.beneficiary.haveImage,
                    records : {
                        enero : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "enero" }),
                        febrero : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "febrero" }),
                        marzo : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "marzo" }),
                        abril : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "abril" }),
                        mayo : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "mayo" }),
                        junio : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "junio" }),
                        julio : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "julio" }),
                        agosto : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "agosto" }),
                        septiembre : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "septiembre" }),
                        octubre : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "octubre" }),
                        noviembre : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "noviembre" }),
                        diciembre : registryBeneficiary.find((registry : Registry )=>{ return registry.month == "diciembre" }),
                    }
                  })
              });
            return new ServerMessages(false, 'Lista de beneficiarios obtenida', registryList);
        } catch (error) {
            return new ServerMessages(true, 'Error obteniendo lista de beneficiarios', {});
        }
    }
}

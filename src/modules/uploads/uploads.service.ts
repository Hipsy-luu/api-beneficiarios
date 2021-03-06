import { ServerMessages } from './../../utils/serverMessages.util';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../models/users.entity';
import * as fs from 'fs';
import { Beneficiary } from '../../models/beneficiary.entity';

@Injectable()
export class UploadsService {
    constructor(
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('BeneficiaryRepository') private readonly beneficiaryRepository: typeof Beneficiary,
    ) { }

    async setUserHaveImage(imageName: string) : Promise<any> {
        let idUser = imageName.substr(0,imageName.indexOf(".jpg"));
        try {
            // Change haveImage to true to the user
            let userForUpdated : User =  await this.userRepository.findOne<User>({
                where: {
                    idUser: idUser
                }
            });

            if(userForUpdated == null){
                return new ServerMessages(true , "Error seteando imagen del usuario, el usuario no existe",{});
            }
            userForUpdated.haveImage = true;
            let user = await userForUpdated.save();
            
            return new ServerMessages(false , "Se subió correctamente la imagen del usuario "+ userForUpdated.idUser,user);
        } catch (error) {
            return new ServerMessages(true , "Error seteando imagen del usuario",error);
        }
    }

    async deleteImageUser(idUser: string) : Promise<any> {
        return new Promise(async (resolve,reject)=>{
            fs.unlink('storage/users/'+idUser+'.jpg' , async (error) => {
                if (error) {
                    resolve( new ServerMessages(true,"Imagen no existe.",{}) );
                }else{
                    try {
                        // Change haveImage to true to the user
                        let userForUpdated : User =  await this.userRepository.findOne<User>({
                            where: {
                                idUser: idUser
                            }
                        });
            
                        if(userForUpdated == null){
                            resolve( new ServerMessages(true , "Error seteando imagen del usuario, el usuario no existe",{}) );
                        }
                        userForUpdated.haveImage = false;
                        let user = await userForUpdated.save();
                        
                        resolve( new ServerMessages(false , "Se elimino correctamente la imagen del usuario "+ userForUpdated.idUser,user) );
                    } catch (error) {
                        resolve( new ServerMessages(true , "Error seteando imagen del usuario",error) );
                    }
                };
            });
        })
    }


    async setBeneficiaryHaveImage(imageName: string) : Promise<any> {
        let idBeneficiary = imageName.substr(0,imageName.indexOf(".jpg"));
        try {
            // Change haveImage to true to the beneficiary
            let beneficiaryForUpdated : Beneficiary =  await this.beneficiaryRepository.findOne<Beneficiary>({
                where: {
                    idBeneficiary: idBeneficiary
                }
            });

            if(beneficiaryForUpdated == null){
                return new ServerMessages(true , "Error seteando imagen del beneficiario, el beneficiario no existe",{});
            }
            beneficiaryForUpdated.haveImage = true;
            let beneficiary = await beneficiaryForUpdated.save();
            
            return new ServerMessages(false , "Se subió correctamente la imagen del beneficiario "+ beneficiary.idBeneficiary,beneficiary);
        } catch (error) {
            return new ServerMessages(true , "Error seteando imagen del beneficiario",error);
        }
    }

    async deleteImageBeneficiary(idBeneficiary: string) : Promise<any> {
        return new Promise(async (resolve,reject)=>{
            fs.unlink('storage/beneficiary/'+idBeneficiary+'.jpg' , async (error) => {
                if (error) {
                    resolve( new ServerMessages(true,"Imagen no existe.",{}) );
                }else{
                    try {
                        // Change haveImage to true to the user
                        let beneficiaryForUpdated : Beneficiary =  await this.beneficiaryRepository.findOne<Beneficiary>({
                            where: {
                                idBeneficiary: idBeneficiary
                            }
                        });
            
                        if(beneficiaryForUpdated == null){
                            resolve( new ServerMessages(true , "Error seteando imagen del beneficiario, el beneficiario no existe",{}) );
                        }
                        beneficiaryForUpdated.haveImage = false;
                        let user = await beneficiaryForUpdated.save();
                        
                        resolve( new ServerMessages(false , "Se elimino correctamente la imagen del beneficiario "+ beneficiaryForUpdated.idBeneficiary,beneficiaryForUpdated) );
                    } catch (error) {
                        resolve( new ServerMessages(true , "Error seteando imagen del beneficiario",error) );
                    }
                };
            });
        })
    }

}

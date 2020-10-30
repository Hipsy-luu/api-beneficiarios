import { Controller, Post, UseInterceptors, UploadedFiles, Body, Param, Get, Res, UseGuards} from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';
import { UploadsService } from './uploads.service';

var usersPath = './storage/users/';
var beneficiarysPath = './storage/beneficiary/';
var formsPath = './storage/forms/';

const jpgFileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if(ext !== '.jpg'){
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }
    return callback(null, true);
}

//Reasigna los valores para guardar la imagen (carpeta y si no existe la crea)
var storageUsers = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log({stringActual : dirCompany , stringdirectorio : dir});
        if (!fs.existsSync('./storage/') ){
            fs.mkdirSync('./storage/');
        }
        if (!fs.existsSync(usersPath) ){
            fs.mkdirSync(usersPath);
        }
        cb(null, usersPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname );
    }
});

//Reasigna los valores para guardar la imagen (carpeta y si no existe la crea)
var storageBeneficiary = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log({stringActual : dirCompany , stringdirectorio : dir});
        if (!fs.existsSync('./storage/') ){
            fs.mkdirSync('./storage/');
        }
        if (!fs.existsSync(beneficiarysPath) ){
            fs.mkdirSync(beneficiarysPath);
        }
        cb(null, beneficiarysPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname );
    }
});

//agarra la carpeta y el nombre del archivo(carpeta y si no existe la crea)
var storageForms = multer.diskStorage({
    destination: function (req, file, cb) {
        var dirIdForm = file.originalname.toString().slice(0,file.originalname.toString().indexOf("-"));
        var dir = formsPath+dirIdForm+'/';
        //console.log({stringActual : dirSong , stringdirectorio : dir});
        if (!fs.existsSync(formsPath)){
            fs.mkdirSync(formsPath);
        }
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        //Desde el nombre ya deberia de venir como se guardara la imagen (piano,guitar o bass)
        let name : String = file.originalname.toString().slice(
            file.originalname.toString().indexOf("-")+1,file.originalname.toString().lengt );
        //console.log("nombre del archivo de la cancion " + name);
        cb( null, name);
    }
});

@Controller('uploads')
export class UploadsController {
    constructor(private uploadsService : UploadsService){}
    //////////////////////////////////////USUARIOS/////////////////////////////////////////////////
    //Crea y guarda la imagen del usuario y su directorio
    @Post('user-image/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files[]', 1, {
        fileFilter: jpgFileFilter,
        storage: storageUsers
    }))
    async userImageFileUpload(@UploadedFiles() images): Promise<any> {
        return await this.uploadsService.setUserHaveImage(images[0].originalname);
    }

    //URL que proporciona las imagenes de los usuarios 
    @Get('user-image/:idUser')
    /* @UseGuards(AuthGuard()) */
    async serveUserImage(@Param('idUser') idUser : String, @Res() res): Promise<any> {
        try {
            res.sendFile( idUser+'.jpg' , { root: 'storage/users/'}, 
            (err) => {
                if (err) {
                    return new ServerMessages(true,"Imagen del usuaruo"+idUser+" no encontrada.",err);
                } else {
                    return new ServerMessages(false,"Imagen del usuario " +idUser + " enviada.",{});
                }
            }
            );
        } catch (error) {
            return new ServerMessages(true,"Imagen del usuaruo"+idUser+" no encontrada.",error);
        }
        
    }
    //Elimina la imagen de un usuario
    @Get('user-delete-image/:idUser')
    @UseGuards(AuthGuard())
    async deleteUserImage(@Param('idUser') idUser : string): Promise<any> {
        return await this.uploadsService.deleteImageUser(idUser );
    }

    //Beneficiario
    //////////////////////////////////////BENEFICIARIOS/////////////////////////////////////////////////
    //Crea y guarda la imagen del beneficiario y su directorio
    @Post('beneficiary-image/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files[]', 1, {
        fileFilter: jpgFileFilter,
        storage: storageBeneficiary
    }))
    async beneficiaryImageFileUpload(@UploadedFiles() images): Promise<any> {
        return await this.uploadsService.setBeneficiaryHaveImage(images[0].originalname);
    }

    //URL que proporciona las imagenes de los beneficiarios 
    @Get('beneficiary-image/:idBeneficiary')
    /* @UseGuards(AuthGuard()) */
    async serveBeneficiaryImage(@Param('idBeneficiary') idBeneficiary : String, @Res() res): Promise<any> {
        try {
            res.sendFile( idBeneficiary+'.jpg' , { root: 'storage/beneficiary/'}, 
            (err) => {
                if (err) {
                    return new ServerMessages(true,"Imagen del beneficiario"+idBeneficiary+" no encontrada.",err);
                } else {
                    return new ServerMessages(false,"Imagen del beneficiario " +idBeneficiary + " enviada.",{});
                }
            }
            );
        } catch (error) {
            return new ServerMessages(true,"Imagen del beneficiario "+idBeneficiary+" no encontrada.",error);
        }
    }
    //Elimina la imagen de un beneficiario
    @Get('beneficiary-delete-image/:idBeneficiary')
    @UseGuards(AuthGuard())
    async deleteImageBeneficiary(@Param('idBeneficiary') idBeneficiary : string): Promise<any> {
        return await this.uploadsService.deleteImageBeneficiary( idBeneficiary );
    }

    //////////////////////////////////////BENEFICIARIOS/////////////////////////////////////////////////
    //Crea y guarda la imagen del beneficiario y su directorio
    @Post('form-image/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files[]', 1, {
        fileFilter: jpgFileFilter,
        storage: storageForms
    }))
    async evidenceImagesImageFileUpload(@UploadedFiles() images): Promise<any> {
        return new ServerMessages(false , "Se subió correctamente la imagen del formulario "+images[0].originalname,{});
    }

    //URL que proporciona las imágenes de las evidencias de los formularios 
    @Get('form-image/:idEconomicStudyForm/:idEvidenceImages')
    /* @UseGuards(AuthGuard()) */
    async serveEvidenceImages(
        @Param('idEconomicStudyForm') idEconomicStudyForm : String,
        @Param('idEvidenceImages') idEvidenceImages : String, 
        @Res() res): Promise<any> {
        try {
            res.sendFile( idEvidenceImages+'.jpg' , { root: 'storage/forms/'+ idEconomicStudyForm + '/'}, 
            (err) => {
                if (err) {
                    return new ServerMessages(true,"Imagen del formulario "+idEconomicStudyForm+" no encontrada."+idEvidenceImages,err);
                } else {
                    return new ServerMessages(false,"Imagen del formulario " +idEconomicStudyForm + " enviada."+idEvidenceImages,{});
                }
            }
            );
        } catch (error) {
            return new ServerMessages(true,"Imagen del formulario "+idEconomicStudyForm+" no encontrada."+idEvidenceImages,error);
        }
    }
    /* //Elimina la imagen de un beneficiario
    @Get('beneficiary-delete-image/:idBeneficiary')
    @UseGuards(AuthGuard())
    async deleteImageBeneficiary(@Param('idBeneficiary') idBeneficiary : string): Promise<any> {
        return await this.uploadsService.deleteImageBeneficiary(idBeneficiary );
    } */
}

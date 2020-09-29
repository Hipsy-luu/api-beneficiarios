
import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import { USER_REPOSITORY } from '../utils/constants';
//Normalmente se usa para formatear el objeto que recibimos en el request
import { ServerMessages } from '../../utils/serverMessages.util';
import { User } from '../../models/users.entity';
import { NewUserPassword } from './dto/newUserPassword.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
    //Es una manera de dar de alta el repositorio de la tabla de usuarios
    @Inject('UserRepository') private readonly userRepository: typeof User,
  ) { }

  /* async consultaEjemplo() {
    let response: any = {};
    try {
      response.newband = await this.bandRepository.findAll<Band>({
        attributes: ['band_id', 'name', 'photo', 'base_price', 'reviews', 'score'],
        where: { active: 1 },
        order: [
          ['created_at', 'DESC'],
        ],
        limit: 10,
        include: [{
          model: State,
          attributes: [['name', 'name']],
        }, {
          model: Town,
          attributes: [['name', 'name']],
        }, {
          model: BandSlider,
          attributes: [['url', 'url']],
          limit: 1
        }],
      }).map((band: any) => {
        return Object.assign(
          {
            band_id: band.band_id,
            name: band.name,
            photo: (new String(JSON.stringify(band.sliders[0])))
              .substring(8, new String(
                JSON.stringify(band.sliders[0])).length - 2),
            base_price: band.base_price,
            reviews: band.reviews,
            score: band.score,
            town_name: band.town.name,
            state_name: band.state.name
          })
      });
      return response;
    } catch (error) {
      return error;
    }
  } */

  /* async testUserWithBand(bandId : string) {
    return await this.userRepository.findOne<User>({include: [Band] ,where: {username: bandId}});
    //return await this.bandRepository.findOne<Band>({include: [User] ,where: {band_id: bandId}});
  }
  
  async findOneByEmail(useremail : string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email: useremail}});
  } */

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      attributes: { exclude: ['password','deleted'] },
      where: { email: email , deleted : false },
    });
  }

  async createUser(newUserData: User): Promise<ServerMessages> {
    if (
      newUserData.name == null ||
      newUserData.name == undefined ||
      newUserData.email == null ||
      newUserData.email == undefined ||
      newUserData.password == null ||
      newUserData.password == undefined ||
      newUserData.canCreateBen == null ||
      newUserData.canCreateBen == undefined ||
      newUserData.canSeeExp == null ||
      newUserData.canSeeExp == undefined ||
      newUserData.role == null ||
      newUserData.role == undefined ||
      newUserData.haveImage == null ||
      newUserData.haveImage == undefined
    ) {
      return new ServerMessages(true, 'Petición incompleta', {});
    }
    
    //Email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(newUserData.email).toLowerCase())) {
      return new ServerMessages(true, 'Correo electrónico invalido.', {});
    }

    //Con esto se evitan incidencias en los nombres
    newUserData.email = newUserData.email.toLowerCase();

    var userEmail = await this.userRepository.findOne<User>({
      attributes: ['email'],
      where: { email: newUserData.email, deleted : false },
    });
    
    if (userEmail) {
      return new ServerMessages(true, 'Correo actualmente registrado', {});
    } else {
      try {
        //END
        var newUser: User = await this.userRepository.create<User>( {
          name : newUserData.name,
          email : newUserData.email,
          password : newUserData.password,
          canCreateBen : newUserData.canCreateBen,
          canSeeExp : newUserData.canSeeExp,
          role : newUserData.role,
          haveImage : newUserData.haveImage,
          deleted : false
        }, {}, );
        let resultEmail = await this.sendWelcomeEmail(newUser.name,newUser.email,newUserData.password);

        if(resultEmail.error == true){
          return new ServerMessages(false, 'Usuario creado con éxito, la contraseña no se pudo enviar al correo', resultEmail);
        }else{
          return new ServerMessages(false, 'Usuario creado con éxito se a enviado la contraseña al correo indicado', newUser);
        }
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }
  }

  async updateUser(updatedUser: User): Promise<ServerMessages> {
    if (
      updatedUser.idUser == undefined ||
      updatedUser.idUser == null ||
      updatedUser.name == null ||
      updatedUser.name == undefined ||
      updatedUser.canCreateBen == null ||
      updatedUser.canCreateBen == undefined ||
      updatedUser.canSeeExp == null ||
      updatedUser.canSeeExp == undefined 
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    }

    var userToUpdate: User = await this.userRepository.findOne<User>({
      where: { idUser: updatedUser.idUser , deleted : false},
    });

    if (!userToUpdate) {
      return new ServerMessages(true, 'El usuario no esta disponible', userToUpdate);
    }

    try {
      userToUpdate.name = updatedUser.name.toString();
      /* userToUpdate.email = updatedUser.email.toString(); */
      userToUpdate.canCreateBen = updatedUser.canCreateBen;
      userToUpdate.canSeeExp = updatedUser.canSeeExp;
  
      userToUpdate.save();
      return new ServerMessages(false, 'Usuario actualizado con éxito', userToUpdate);
    } catch (error) {
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async updateUserPassword(
    idUser,
    newUserPassword: NewUserPassword,
  ): Promise<ServerMessages> {
    //console.log(newUserPassword);

    if (!newUserPassword.idUser || !idUser || !newUserPassword.newPassword) {
      return new ServerMessages(true, 'Petición incompleta', {});
    } else if (newUserPassword.newPassword.length < 8) {
      return new ServerMessages(true, 'La contraseña del usuario debe contener al menos 8 caracteres.', {});
    }

    let user = await this.userRepository.findOne<User>({
      where: { idUser: idUser, deleted : false },
    });
    try {
      user.password = await user.hashNewPassword(newUserPassword.newPassword);
      await user.save();
      return new ServerMessages(
        false,
        'Contraseña de usuario actualizada con éxito',
        user,
      );
    } catch (error) {
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async deleteUser(idUser: string): Promise<ServerMessages> {
    if (
      idUser == undefined ||
      idUser == null ||
      idUser == "" 
    ) {
      return new ServerMessages(true, 'Petición incompleta', {});
    }

    var userToUpdate: User = await this.userRepository.findOne<User>({
      where: { idUser: idUser , deleted : false},
    });

    if (!userToUpdate) {
      return new ServerMessages(true, 'El usuario no esta disponible', userToUpdate);
    }

    try {
      userToUpdate.deleted =  true;
      userToUpdate.save();
      return new ServerMessages(false, 'Usuario borrado con éxito', userToUpdate);
    } catch (error) {
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async getAllUsers(emailUser : string): Promise<ServerMessages> {
    try {
      var userList = await this.userRepository.findAll<User>({
        attributes: { exclude: ['password','deleted'] },
        where : { 
          deleted : false ,  
          email : { 
            [Op.not] : emailUser
          } 
        }
      });
      return new ServerMessages(false, 'Lista de usuarios obtenida', userList);
    } catch (error) {
      return new ServerMessages(true, 'Error obteniendo lista de usuarios', {});
    }
  }


  async sendWelcomeEmail(userName : string , newEmail : string , newPassword : string): Promise<ServerMessages> {
    return new Promise(async (resolve,reject)=>{
      try {
        //toEmails = es una variable donde pasas los emails separados por coma
        
        this.mailerService.sendMail({
          to: 'api.test.beneficiarios@gmail.com,'+ newEmail, // list of receivers string separado por comas
          from: 'api.test.beneficiarios@gmail.com', // sender address
          subject: "✔ Bienvenido : "+ userName ,// Subject line
          //text: 'welcome', // plaintext body
          //html: '<b>email : {{email}} . password : {{password}}</b>', /* welcomeEmail,  */ // HTML body content 
          template: "welcome", // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
          context: {  // Data to be sent to template engine.
            email: newEmail,
            password: newPassword,
          },
          // encoded string as an attachment
          /* attachments: [
            {   
              // encoded string as an attachment
              filename: 'acuse-' + data.idRespuestas + '.pdf',
              path: 'data:application/pdf;base64,'+data.pdfBase64
            },
          ] */
        })
        .then((success) => {
          resolve( new ServerMessages(false, "Email enviado con éxito", success) ); 
        })
        .catch((error) => {
          console.log(error);
          reject ( new ServerMessages(true, "Error enviando correo", error) );
        });
      } catch (error) {
        reject( new ServerMessages(true, "Error 2 enviando correo", error) ) ;
      }
    })
  }


  
}

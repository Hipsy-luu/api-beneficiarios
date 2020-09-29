export class CreateUserDto {
  idUser: number;
  name: string;
  email: string;
  password : string; //se genera automáticamente
  permissionCreate : boolean;
  permissionSeeExp : boolean;
}

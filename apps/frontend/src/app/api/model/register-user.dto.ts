import { Dto } from './dto.base';

export class RegisterUserDto extends Dto {
  public username!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
}

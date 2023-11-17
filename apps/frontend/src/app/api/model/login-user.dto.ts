import { Dto } from './dto.base';

export class LoginUserDto extends Dto {
  public email!: string;
  public password!: string;
}

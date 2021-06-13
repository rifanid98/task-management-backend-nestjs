import { IsNotEmpty, IsString } from 'class-validator';
import { AuthCredentialsDto } from './auth-credential.dto';

export class CredentialsDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

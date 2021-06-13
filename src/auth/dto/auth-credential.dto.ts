import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

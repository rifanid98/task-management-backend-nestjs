import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

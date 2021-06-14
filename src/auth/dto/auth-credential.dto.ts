import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Passwords should contain at least 1 upper case letter\nPasswords should contain at least 1 lower case letter\nPasswords should contain at least 1 number or special character`,
  })
  password: string;
}

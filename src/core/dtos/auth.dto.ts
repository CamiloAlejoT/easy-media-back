import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AUTH } from 'src/core/enums/auth.enum'

export class SignInDto {
  @IsEmail({}, { message: AUTH.EMAILINVALID })
  @IsNotEmpty({ message: AUTH.EMAILEMPTY })
  email: string;

  @IsString({ message: AUTH.PASSWORDNOTSTRING })
  @MinLength(6, { message: AUTH.PASSWORDLENGTH })
  @IsNotEmpty({ message: AUTH.PASSWORDEMPRY })
  password: string;

  @IsString({ message: AUTH.NAMENOTSTRING })
  @IsNotEmpty({ message: AUTH.NAMEEMPTY })
  name: string;
}

export class LoginDto {
  @IsEmail({}, { message: AUTH.EMAILINVALID })
  @IsNotEmpty({ message: AUTH.EMAILEMPTY })
  email: string;

  @IsString({ message: AUTH.PASSWORDNOTSTRING })
  @MinLength(6, { message: AUTH.PASSWORDLENGTH })
  @IsNotEmpty({ message: AUTH.PASSWORDEMPRY })
  password: string;
}

export class logOutDto {
  @IsString({ message: AUTH.UUIDNOTSTRING })
  @IsNotEmpty({ message: AUTH.UUIDEMPTY })
  uuid: string;
}

export class renewDto {
  @IsEmail({}, { message: AUTH.EMAILINVALID })
  @IsNotEmpty({ message: AUTH.EMAILEMPTY })
  email: string
}
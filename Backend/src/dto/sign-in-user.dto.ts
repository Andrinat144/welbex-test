import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @Expose()
  @IsString({ message: 'Пороль должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите пороль' })
  password!: string;

  @Expose()
  @IsEmail({}, { message: 'Укажите корректный e-mail' })
  @IsString({ message: 'E-mail должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите e-mail' })
  email!: string;
}

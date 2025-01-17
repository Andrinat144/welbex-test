import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @Expose()
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Укажите имя пользователя' })
  name!: string;

  @Expose()
  @IsString({ message: 'Фамилия пользователя должна быть строкой' })
  @IsNotEmpty({ message: 'Укажите фамилию пользователя' })
  surname!: string;

  @Expose()
  @IsString({ message: 'Позиция пользователя должна быть строкой' })
  @IsNotEmpty({ message: 'Укажите позицию пользователя' })
  position!: string;

  @Expose()
  @IsEmail({}, { message: 'Укажите корректный e-mail' })
  @IsString({ message: 'E-mail должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите e-mail' })
  email!: string;

  @Expose()
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Укажите пароль' })
  password!: string;
}

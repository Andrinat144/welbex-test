import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/appDataSource';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { SignUpUserDto } from '@/dto/sign-up-user.dto';
import { User } from '@/entities/user.entity';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.createEntityManager());
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    const existingUser = await this.findOne({ where: { email: signUpUserDto.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = this.create(signUpUserDto);
    return await this.save(newUser);
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.findOne({
      where: { email: signInUserDto.email },
    });
    if (!user) throw Error('Неверный email или пароль');
    const isMatch = await user.comparePassword(signInUserDto.password);

    if (!isMatch) throw Error('Неверный email или пароль');
    return user;
  }
}

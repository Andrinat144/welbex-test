import bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import jwt from 'jsonwebtoken';

import config from '@/config';
import { ResponseUserDto } from '@/dto/response-user.dto';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { SignUpUserDto } from '@/dto/sign-up-user.dto';
import { JwtPayload } from '@/interfaces/jwt-payload.interface';
import { UserRepository } from '@/repository/user.repository';

export class UserService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    const hashedPassword = await this.hashPassword(signUpUserDto.password);

    const newUser = this.repository.create({
      ...signUpUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.repository.save(newUser);

    const { accessToken, refreshToken } = this.generateToken({
      id: savedUser.id,
    });

    savedUser.refreshToken = refreshToken;
    await this.repository.save(savedUser);

    return plainToInstance(ResponseUserDto, { ...savedUser, accessToken, refreshToken });
  }

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.repository.signIn(signInUserDto);
    const { accessToken, refreshToken } = this.generateToken({ id: user.id });
    user.refreshToken = refreshToken;
    await this.repository.save(user);
    return plainToInstance(ResponseUserDto, { ...user, accessToken, refreshToken });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(config.SALT_WARK_FACTOR);
    return await bcrypt.hash(password, salt);
  }

  generateToken(payload: { id: number }) {
    const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });
    return { accessToken, refreshToken };
  }

  async signOut(userId: number) {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (user) {
      user.refreshToken = '';
      await this.repository.save(user);
    }
  }

  verifyToken(token: string) {
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
  }
}

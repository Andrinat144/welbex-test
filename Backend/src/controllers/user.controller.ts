import { plainToInstance } from 'class-transformer';
import { Request, RequestHandler, Response } from 'express';

import { ValidateDto } from '@/decorators/validate-dto.decorator';
import { SignInUserDto } from '@/dto/sign-in-user.dto';
import { SignUpUserDto } from '@/dto/sign-up-user.dto';
import { IUser } from '@/interfaces/IUser.interface';
import { RequestWithUser } from '@/middlewares/checkUser';
import { UserService } from '@/services/user.service';

export class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  @ValidateDto(SignUpUserDto)
  async signUp(req: Request<object, IUser, SignUpUserDto>, res: Response): Promise<void> {
    try {
      const signUpUserDto = plainToInstance(SignUpUserDto, req.body);
      const user = await this.service.signUp(signUpUserDto);

      res.cookie('jwt', user.refreshToken, { httpOnly: true });
      res.status(201).send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ error: { message: e.message } });
        return;
      }
      res.status(500).send({ error: { message: 'Oops something went wrong' } });
    }
  }

  @ValidateDto(SignInUserDto)
  async signIn(req: Request<object, IUser, SignInUserDto>, res: Response): Promise<void> {
    try {
      const signInUserDto = plainToInstance(SignInUserDto, req.body);

      const user = await this.service.signIn(signInUserDto);

      res.cookie('jwt', user.refreshToken, { httpOnly: true });
      res.send(user);
    } catch (e) {
      if (e instanceof Error) {
        res.status(401).send({ error: { message: e.message } });
        return;
      }
      res.status(500).send({ error: { message: 'Oops something went wrong' } });
    }
  }

  signOut: RequestHandler = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (req.user) {
        await this.service.signOut(req.user.id);
        res.clearCookie('jwt');
        res.send({ message: 'success' });
        return;
      }
      res.status(404).send({ error: { message: 'User not found' } });
    } catch (error) {
      console.log(error);

      res.status(500).send({ error: { message: 'Internal Server error' } });
    }
  };

  refreshToken: RequestHandler = (req, res) => {
    const refreshToken = req.cookies.jwt;
    console.log(req.cookies);

    if (!refreshToken) {
      res.status(401).send({ error: { message: 'Token not exist' } });
      return;
    }
    try {
      const { id } = this.service.verifyToken(refreshToken);
      const tokens = this.service.generateToken({ id });
      res.cookie('jwt', tokens.refreshToken, { httpOnly: true });
      res.send(tokens);
    } catch (error) {
      console.log(error);

      res.status(401).send({ error: { message: 'Token invalid' } });
    }
  };
}

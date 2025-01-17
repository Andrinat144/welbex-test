import { Request } from 'express';

import { IUser } from '@/interfaces/IUser.interface';

export interface RequestWithUser extends Request {
  user?: IUser;
}

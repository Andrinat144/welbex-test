import { IUserWithoutTokens } from '@/Interfaces/IUser.interface';

export interface IBlog {
  id: number;
  media: string;
  text: string;
  date: string;
  user: IUserWithoutTokens;
}

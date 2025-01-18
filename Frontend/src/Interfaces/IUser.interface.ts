export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export type IUserWithoutTokens = Omit<IUser, 'accessToken' | 'refreshToken'>;

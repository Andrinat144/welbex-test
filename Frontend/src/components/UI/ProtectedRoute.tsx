import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { IUser } from '@/Interfaces/IUser.interface';

type TProps = {
  user: IUser | null;
  children: ReactNode;
};

export const ProtectedRoute = ({ user, children }: TProps) => {
  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return children;
};

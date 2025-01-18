import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { signOut } from '@/store/slices/userSlice';

export const useAppToolbar = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(signOut());
  };

  return {
    name: userInfo ? `${userInfo?.name} ${userInfo?.surname}` : null,
    handleLogout,
    navigate,
  };
};

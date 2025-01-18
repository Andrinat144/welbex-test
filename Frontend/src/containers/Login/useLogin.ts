import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { signIn, signUp } from '@/store/slices/userSlice';

export interface LoginState {
  email: string;
  password: string;
}

export interface LogUpState extends LoginState {
  name: string;
  surname: string;
}

export const useLogin = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const { userInfo, userLoading, signInError } = useAppSelector((state) => state.users);

  const initialValues: LoginState = {
    email: '',
    password: '',
  };

  const signUpInitialValues: LogUpState = {
    email: '',
    password: '',
    name: '',
    surname: '',
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('validation.emailInvalid').required('validation.emailRequired'),
    password: Yup.string().required('validation.passwordRequired'),
  });

  const signUpValidationSchema = Yup.object({
    email: Yup.string().email('validation.emailInvalid').required('validation.emailRequired'),
    password: Yup.string().required('validation.passwordRequired'),
    name: Yup.string().required('validation.passwordRequired'),
    surname: Yup.string().required('validation.passwordRequired'),
  });

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmit = (values: LoginState) => {
    dispatch(signIn(values)).unwrap();
  };

  const handleSignUpSubmit = (values: LogUpState) => {
    dispatch(signUp(values)).unwrap();
  };

  useEffect(() => {
    if (userInfo?.accessToken) {
      setIsSubmitted(true);
      navigation('/');
    }
  }, [navigation, userInfo?.accessToken]);

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isSubmitted,
    userInfo,
    userLoading,
    signInError,
    tabValue,
    handleChangeTab,
    a11yProps,
    signUpValidationSchema,
    signUpInitialValues,
    handleSignUpSubmit,
  };
};

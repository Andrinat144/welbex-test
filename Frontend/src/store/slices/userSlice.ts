import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosApiClient, IRefreshResponse } from '@/api/axiosApiClient';
import { ErrorMessage, ValidationError } from '@/Interfaces/errors.interface';
import { IUser } from '@/Interfaces/IUser.interface';
import { RootState } from '@/store/store';

type ValidationErrorResponse = ValidationError[];
type ErrorResponse = ValidationErrorResponse | ErrorMessage;
type ErrorUserBlocked = { error: { message: string } };

export interface UserState {
  userInfo: IUser | null;
  userLoading: boolean;
  signInError: string | null;
  signUpError: string | null;
  fetchError: string | null;
  signInValidationError: null | ValidationErrorResponse;
}

interface UserRequestData {
  email: string;
  password: string;
}

export interface SignUpRequestData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export const signUp = createAsyncThunk<IUser | null, SignUpRequestData, { rejectValue: ErrorResponse }>(
  'auth/sign-up',
  async (payload: SignUpRequestData, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.post<IUser | ErrorUserBlocked>('auth/sign-up', payload);
      return response.data as IUser;
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        return rejectWithValue(
          error.response?.data || { error: { message: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.' } }
        );
      }
      throw error;
    }
  }
);

export const signIn = createAsyncThunk<IUser | null, UserRequestData, { rejectValue: ErrorResponse }>(
  'auth/sign-in',
  async (payload: UserRequestData, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.post<IUser | ErrorUserBlocked>('auth/sign-in', payload);
      return response.data as IUser;
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        return rejectWithValue(
          error.response?.data || { error: { message: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.' } }
        );
      }
      throw error;
    }
  }
);

export const signOut = createAsyncThunk<{ message: string }, void, { rejectValue: ErrorResponse; state: RootState }>(
  'auth/sign-out',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApiClient.delete('auth/sign-out');
      return response.data;
    } catch (error) {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(error.response?.data);

        return rejectWithValue(
          error.response?.data || { error: { message: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.' } }
        );
      }
      throw error;
    }
  }
);

const initialState: UserState = {
  userInfo: null,
  userLoading: false,
  signInError: null,
  signUpError: null,
  fetchError: null,
  signInValidationError: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<IRefreshResponse>) => {
      if (state.userInfo) {
        state.userInfo.accessToken = action.payload.accessToken;
      }
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(signUp.pending, (state) => {
        state.userLoading = true;
        state.signUpError = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.userInfo = action.payload as IUser;
        state.userLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userLoading = false;
        if (Array.isArray(action.payload)) {
          state.signInValidationError = action.payload;
          return;
        }
        state.signUpError = action.payload?.error.message ?? 'something wrong in signIn';
      })
      .addCase(signIn.pending, (state) => {
        state.userLoading = true;
        state.signInError = null;
        state.signInValidationError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.userInfo = action.payload as IUser;
        state.userLoading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.userLoading = false;
        if (Array.isArray(action.payload)) {
          state.signInValidationError = action.payload;
          return;
        }
        state.signInError = action.payload?.error.message ?? 'something wrong in signIn';
      })
      .addCase(signOut.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userLoading = false;
        state.userInfo = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.userLoading = false;
        state.userInfo = null;
      });
  },
});

export const { logout, updateToken } = userSlice.actions;
export default userSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { createTransform, FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { injectStore } from '@/api/axiosApiClient';
import { rootReducer } from '@/app/rootReducer';
import { userSlice, UserState } from '@/store/slices/userSlice';

const transform = createTransform(
  (inboundState: UserState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { signInError: _signInError, ...rest } = inboundState;
    return rest;
  },
  null,
  { whitelist: [userSlice.name] }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [transform],
  whitelist: [userSlice.name],
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

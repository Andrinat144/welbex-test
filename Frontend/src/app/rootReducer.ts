import { combineReducers } from '@reduxjs/toolkit';

import { blogSlice } from '@/store/slices/blogSlice';
import { userSlice } from '@/store/slices/userSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [blogSlice.name]: blogSlice.reducer,
});

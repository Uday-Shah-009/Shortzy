import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authReducer.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

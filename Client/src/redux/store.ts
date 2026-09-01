import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/auth/auth.slice';
import budgetReducer from '@/redux/createExpenss/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

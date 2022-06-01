import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import toysReducer from '../features/toys/toysSlice';

export const store = configureStore({
  reducer: {
    toys: toysReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

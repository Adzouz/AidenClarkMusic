import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

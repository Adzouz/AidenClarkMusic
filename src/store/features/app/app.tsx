import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../..';
import { IAppSlice, IAppSliceConfig } from '../../../types';

const app = createSlice({
  name: 'app',
  initialState: {
    initialized: false,
    loading: true,
    config: {
      localeId: ''
    }
  } as IAppSlice,
  reducers: {
    setupStarted(state) {
      state.loading = true;
    },
    setupApp(state, action: PayloadAction<IAppSliceConfig>) {
      state.config = action.payload;
      state.loading = false;
      state.initialized = true;
    },
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    }
  }
});

export const { setupStarted, setupApp, startLoading, endLoading } = app.actions;

export default app.reducer;

export const fetchAppSetup = () => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setupStarted());

    const config: IAppSliceConfig = {
      localeId: process.env.REACT_APP_DEV_LOCALE
    };

    // Eventually set the app loading status
    await dispatch(setupApp(config));
  } catch (error) {
    console.log('App Setup Error: ', error);
  }
};

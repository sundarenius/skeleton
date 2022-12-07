import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ThemeModes } from 'types/globals';

interface InitialState {
  themeMode: ThemeModes,
}

const initialState: InitialState = {
  themeMode: 'dark',
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeModes>) => {
      state.themeMode = action.payload;
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ThemeModes } from 'types/globals';
import { updateSessionStorageData } from 'utils/helpers';

const allCustomers = () => ([
  'Apotea',
  'Snusbolaget',
  'Apoteket',
]);

interface InitialState {
  isFetchingData: boolean,
  themeMode: ThemeModes,
  merchant: string,
  allCustomers: string[],
}

const initialState: InitialState = {
  isFetchingData: false,
  themeMode: 'dark',
  merchant: allCustomers()[0],
  allCustomers: allCustomers(),
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setIsFetchingData: (state, action: PayloadAction<boolean>) => {
      state.isFetchingData = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<ThemeModes>) => {
      state.themeMode = action.payload;
      updateSessionStorageData({ THEME_MODE: action.payload });
    },
    setMerchant: (state, action: PayloadAction<string>) => {
      state.merchant = action.payload;
      updateSessionStorageData({ SELECTED_MERCHANT: action.payload });
    },
    setAllCustomers: (state, action: PayloadAction<string[]>) => {
      state.allCustomers = action.payload;
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;

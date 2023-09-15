import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  dummy: null
}

const initialState: InitialState = {
  dummy: null
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setDummy: (state, action: PayloadAction<null>) => {
      state.dummy = action.payload;
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  dummy: number,
}

const initialState: InitialState = {
  dummy: 0,
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setDummy: (state, action: PayloadAction<number>) => {
      state.dummy = action.payload;
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  dummy: null,
  drawerLeft: number,
  drawerRight: number,
}

const initialState: InitialState = {
  dummy: null,
  drawerLeft: 240,
  drawerRight: 200,
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

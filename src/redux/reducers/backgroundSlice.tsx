import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Background } from '../../types/Background.type';

interface initBGState {
  listBGs: Background[];
  selectBGId: number
}

const initState: initBGState = {
  listBGs: [],
  selectBGId: 0
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState: initState,
  reducers: {
    findAllBGs: () => {},
    getAllBGs: (state, action: PayloadAction<Background []>) => {
      state.listBGs = action.payload;
    },
    selectBGId: (state, action: PayloadAction<number>) => {
      state.selectBGId = action.payload;
    }
  },
});

export default backgroundSlice.reducer;
export const { findAllBGs, getAllBGs, selectBGId } = backgroundSlice.actions;


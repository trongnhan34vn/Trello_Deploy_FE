import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeProject } from '../../types/TypeProject.type';

const listTypes : TypeProject[] = []

const typeProjectSlice = createSlice({
  name: 'typeProject',
  initialState: {
    listTypes: listTypes
  },
  reducers: {
    findAllTypes: () => {},
    getAllTypes: (state, action: PayloadAction<TypeProject[]>) => {
      state.listTypes = action.payload
    },
  },
});

export default typeProjectSlice.reducer;
export const { findAllTypes, getAllTypes } = typeProjectSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Work, WorkDel, WorkForm } from '../../types/Work.type';

interface WorkState {
  listWorks: Work[];
}

const initialStates: WorkState = {
  listWorks: [],
};

const workSlice = createSlice({
  name: 'work',
  initialState: initialStates,
  reducers: {
    createWork: (state, action: PayloadAction<WorkForm>) => {},
    findWorksByCardId: (state, action: PayloadAction<number>) => {},
    getWorksByCardId: (state, action: PayloadAction<Work[]>) => { 
      state.listWorks = action.payload
    },
    deleteWork: (state, action: PayloadAction<WorkDel>) => {}
  },
});

export default workSlice.reducer;
export const { createWork, findWorksByCardId, getWorksByCardId, deleteWork } = workSlice.actions;

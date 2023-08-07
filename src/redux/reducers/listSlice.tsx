import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DragList, List, ListForm } from '../../types/List.type';

interface ListState {
  lists: List[];
  selectList: List | null;
}
const initState: ListState = {
  lists: [],
  selectList: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState: initState,
  reducers: {
    findListsByTableId: (state, action: PayloadAction<number>) => {},
    getListsByTableId: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
    updateDragList: (state, action: PayloadAction<DragList>) => {},
    createList: (state, action: PayloadAction<ListForm>) => {},
    findListById: (state, action: PayloadAction<number>) => {},
    getListById: (state, action: PayloadAction<List>) => {
      state.selectList = action.payload;
    },
    findAllList: () => {
      
    },
    getAllList: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload
    }
  },
});

export default listSlice.reducer;
export const {
  findListsByTableId,
  getListsByTableId,
  updateDragList,
  createList,
  findListById,
  getListById,
  findAllList,
  getAllList
} = listSlice.actions;

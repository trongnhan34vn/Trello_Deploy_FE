import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Table, TableDTO } from '../../types/Table.type';

interface TableState {
  latestTable: Table | null;
  listTable: Table[];
  selectTable: Table | null;
  tablesByProjectId: Table []
  memberTable: Table | null;
}

const initialState: TableState = {
  latestTable: null,
  listTable: [],
  selectTable: null,
  tablesByProjectId: [],
  memberTable: null
};

const tableSlice = createSlice({
  name: 'table',
  initialState: initialState,
  reducers: {
    createTable: (state, action: PayloadAction<TableDTO>) => {},
    getLatestTable: (state, action: PayloadAction<Table>) => {
      state.latestTable = action.payload;
    },
    resetTableJustAdded: (state) => {
      state.latestTable = null;
    },
    findTableByProjectId: (state, action: PayloadAction<number>) => {},
    getTablesByProjectId: (state, action: PayloadAction<Table[]>) => {
      state.tablesByProjectId = action.payload;
    },
    findAll: () => {},
    getAll: (state, action: PayloadAction<Table[]>) => {
      state.listTable = action.payload;
    },
    findById: (state, action: PayloadAction<number>) => {},
    getById: (state, action: PayloadAction<Table>) => {
      state.selectTable = action.payload;
    },
    getMemberTable: (state, action: PayloadAction<Table|null>) => {
      state.memberTable = action.payload;
    }
  },
});

export default tableSlice.reducer;
export const {
  createTable,
  getLatestTable,
  resetTableJustAdded,
  findTableByProjectId,
  getTablesByProjectId,
  findAll,
  getAll,
  findById,
  getById,
  getMemberTable
} = tableSlice.actions;

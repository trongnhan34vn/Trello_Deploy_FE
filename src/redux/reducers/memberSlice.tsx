import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Member,
  MemberForm,
  MemberUpdateCard,
  MemberUpdateRole,
  MemberUpdateTask,
} from '../../types/Member.type';

interface MemberState {
  members: Member[];
  membersByUserId: Member[];
}

const initialState: MemberState = {
  members: [],
  membersByUserId: []
};

const memberSlice = createSlice({
  name: 'member',
  initialState: initialState,
  reducers: {
    createMember: (state, action: PayloadAction<MemberForm>) => {},
    findAll: () => {},
    getAll: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    findByTableId: (state, action: PayloadAction<number>) => {},
    getByTableId: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    updateRole: (state, action: PayloadAction<MemberUpdateRole>) => {},
    updateCard: (state, action: PayloadAction<MemberUpdateCard>) => {},
    updateTask: (state, action: PayloadAction<MemberUpdateTask>) => {},
    findByUserId: (state, action: PayloadAction<number>) => {},
    getByUserId: (state, action: PayloadAction<Member[]>) => {
      state.membersByUserId = action.payload
    }
  },
});

export default memberSlice.reducer;
export const {
  createMember,
  findByTableId,
  getByTableId,
  updateRole,
  updateCard,
  updateTask,
  findAll,
  getAll,
  findByUserId,
  getByUserId
} = memberSlice.actions;

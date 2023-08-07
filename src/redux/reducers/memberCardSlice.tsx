import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MemberCard, MemberCardForm } from '../../types/MemberCard.type';

interface MemberCardState {
  memberCards: MemberCard[];
}

const initialState: MemberCardState = {
  memberCards: [],
}

const memberCardSlice = createSlice({
  name: 'memberCardSlice',
  initialState: initialState,
  reducers: {
    findAll: () => {},
    getAll: (state, action: PayloadAction<MemberCard[]>) => {
      state.memberCards = action.payload;
     },
    create: (state, action: PayloadAction<MemberCardForm>) => {},
    deleteMC: (state, action: PayloadAction<number>) => {},
  },
});

export default memberCardSlice.reducer;
export const { create, deleteMC, findAll, getAll } = memberCardSlice.actions;

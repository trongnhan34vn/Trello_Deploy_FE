import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  selectCardId: string | null; 
}

const initialState : ModalState = {
  selectCardId: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    onOpenModal: (state, action) => {
      state.selectCardId = action.payload
    },
    onCloseModal: (state) => {
      state.selectCardId = null
    },
  },
});

export default modalSlice.reducer;
export const { onOpenModal, onCloseModal } = modalSlice.actions;

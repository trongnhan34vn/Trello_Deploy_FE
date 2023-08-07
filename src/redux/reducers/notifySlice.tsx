import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notify } from '../../types/Notify.type';

interface NotifyState {
  notify: Notify | null;
}

const initialState: NotifyState = {
  notify: null,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState: initialState,
  reducers: {
    notify: (state, action: PayloadAction<Notify | null>) => {
      state.notify = action.payload;
    },
  },
});

export default notifySlice.reducer;
export const { notify } = notifySlice.actions;

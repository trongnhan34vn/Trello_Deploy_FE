import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CardDB,
  CardForm,
  CardPatch,
  CardPatchTest,
  CardUpdateDate,
  CardUpdateDescription,
  CardUpdateName,
  CardUpdateStatus,
} from '../../types/Card.type';

interface CardState {
  listCards: CardDB[];
  selectCard: CardDB | null;
  search: CardDB[]
}

const initState: CardState = {
  listCards: [],
  selectCard: null,
  search: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState: initState,
  reducers: {
    findAllCards: () => {},
    getAllCards: (state, action: PayloadAction<CardDB[]>) => {
      state.listCards = action.payload;
    },
    createCard: (state, action: PayloadAction<CardForm>) => {},
    deleteCard: (state, action: PayloadAction<number>) => {},
    updateCard: (state, action: PayloadAction<CardPatch>) => {},
    updateCardTest: (state, action: PayloadAction<CardPatchTest>) => {},
    findCardById: (state, action: PayloadAction<number>) => {},
    getCardById: (state, action: PayloadAction<CardDB | null>) => {
      state.selectCard = action.payload;
    },
    updateCardDescription: (
      state,
      action: PayloadAction<CardUpdateDescription>
    ) => {},
    updateCardDate: (state, action: PayloadAction<CardUpdateDate>) => {},
    updateCardStatus: (state, action: PayloadAction<CardUpdateStatus>) => {},
    updateCardName: (state, action: PayloadAction<CardUpdateName>) => {},
    searchCardByName: (state, action: PayloadAction<string>) => {},
    getSearchByName: (state, action: PayloadAction<CardDB[]>) => {
      state.listCards = action.payload;
    },
    filterCardNoMembers: (state, action: PayloadAction<CardDB[]>) => {
      state.listCards = action.payload;
    },
  },
});

export default cardSlice.reducer;
export const {
  findAllCards,
  getAllCards,
  createCard,
  deleteCard,
  updateCard,
  updateCardTest,
  findCardById,
  getCardById,
  updateCardDescription,
  updateCardDate,
  updateCardStatus,
  updateCardName,
  searchCardByName,
  getSearchByName,
  filterCardNoMembers
} = cardSlice.actions;

import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { CREATE, DELETE, FIND_ALL } from '../../api/services/cardLabelServices';
import { getAll } from '../../redux/reducers/cardLabelSlice';
import { CardLabel, CardLabelForm } from '../../types/CardLabel.type';

export const findAll = function* () {
  try {
    let response: CardLabel[] = yield call(FIND_ALL);
    yield put(getAll(response));
  } catch (error) {}
};

export const create = function* ({ payload }: PayloadAction<CardLabelForm>) {
  try {
    yield call(CREATE, payload);
    yield findAll();
  } catch (error) {}
};

export const remove = function* ({ payload }: PayloadAction<number>) {
  try {
    yield call(DELETE, payload);
    yield findAll();
  } catch (error) {}
};

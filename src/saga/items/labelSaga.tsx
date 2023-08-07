import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import {
  CREATE,
  DELETE,
  FIND_ALL,
  SEARCH_BY_NAME,
  UPDATE,
} from '../../api/services/labelServices';
import { getAll, getByName, getJustAdd } from '../../redux/reducers/labelSlice';
import { Label, LabelForm } from '../../types/Label.type';
import * as cardLabelSaga from './cardLabelSaga';

export const findAll = function* () {
  try {
    let response: Label[] = yield call(FIND_ALL);
    yield put(getAll(response));
  } catch (error) {}
};

export const searchByName = function* ({ payload }: PayloadAction<string>) {
  try {
    let response: Label[] = yield call(SEARCH_BY_NAME, payload);
    yield put(getByName(response));
  } catch (error) {}
};

export const create = function* ({ payload }: PayloadAction<LabelForm>) {
  try {
    let response: Label = yield call(CREATE, payload);
    yield put(getJustAdd(response));
    yield findAll();
  } catch (error) {}
};

export const update = function* ({ payload }: PayloadAction<Label>) {
  try {
    yield call(UPDATE, payload);
    yield findAll();
  } catch (error) {}
};

export const remove = function* ({ payload }: PayloadAction<number>) {
  try {
    yield call(DELETE, payload);
    yield findAll();
    yield cardLabelSaga.findAll();
  } catch (error) {}
};

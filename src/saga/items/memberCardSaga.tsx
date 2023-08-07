import { PayloadAction } from '@reduxjs/toolkit';
import { MemberCard } from '../../types/MemberCard.type';
import { call, put } from 'redux-saga/effects';
import {
  CREATE,
  DELETE_MC,
  FIND_ALL,
} from '../../api/services/memberCardServices';
import { getAll } from '../../redux/reducers/memberCardSlice';

export const findAll = function* () {
  try {
    let response: MemberCard[] = yield call(FIND_ALL);
    yield put(getAll(response));
  } catch (error) {}
};

export const create = function* ({ payload }: PayloadAction<MemberCard>) {
  try {
    yield call(CREATE, payload);
    yield findAll();
  } catch (error) {}
};

export const deleteMC = function* ({ payload }: PayloadAction<number>) {
  try {
    yield call(DELETE_MC, payload);
    yield findAll();
  } catch (error) {}
};

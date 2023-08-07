import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { CREATE_WORK, DELETE_WORK, FIND_BY_CARD_ID } from '../../api/services/workServices';
import { getWorksByCardId } from '../../redux/reducers/workSlice';
import { Work, WorkDel, WorkForm } from '../../types/Work.type';

export const createWork = function* (action: PayloadAction<WorkForm>) {
  try {
    yield call(CREATE_WORK, action.payload)
    let fakeAction : PayloadAction<number> = {
      type: 'fake action',
      payload: action.payload.cardId
    }
    yield findWorksByCardId(fakeAction)
  } catch (error) {
    
  }
}

export const findWorksByCardId = function* (action: PayloadAction<number>) {
  try {
    let response: Work[] = yield call(FIND_BY_CARD_ID, action.payload);
    yield put(getWorksByCardId(response));
  } catch (error) {
    
  }
}

export const deleteWork = function* (action: PayloadAction<WorkDel>) {
  try {
    yield call(DELETE_WORK, action.payload);
    let fakeAction : PayloadAction<number> = {
      type: 'fake action',
      payload: action.payload.cardId
    }
    yield findWorksByCardId(fakeAction)
  } catch (error) {
    
  }
}
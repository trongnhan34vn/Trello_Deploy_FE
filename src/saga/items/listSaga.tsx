import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import {
  CREATE_LIST,
  FIND_ALL,
  FIND_LISTS_BY_TABLE_ID,
  FIND_LIST_BY_ID,
  UPDATE_DRAG_LIST,
} from '../../api/services/listServices';
import {
  getAllList,
  getListById,
  getListsByTableId,
} from '../../redux/reducers/listSlice';
import { DragList, List, ListForm } from '../../types/List.type';

export const findAllLists = function* () {
  try {
    let response: List[] = yield call(FIND_ALL);
    yield put(getAllList(response));
  } catch (error) {}
};

export const findListsByTableId = function* (action: PayloadAction<number>) {
  try {
    let response: List[] = yield call(FIND_LISTS_BY_TABLE_ID, action.payload);
    yield put(getListsByTableId(response));
  } catch (error) {}
};

export const updateDragList = function* (action: PayloadAction<DragList>) {
  try {
    yield call(UPDATE_DRAG_LIST, action.payload);
  } catch (error) {}
};

export const createList = function* (action: PayloadAction<ListForm>) {
  try {
    yield call(CREATE_LIST, action.payload);
    yield findAllLists()
  } catch (error) {}
};

export const findListById = function* (action: PayloadAction<number>) {
  try {
    let response: List = yield call(FIND_LIST_BY_ID, action.payload);
    yield put(getListById(response));
  } catch (error) {}
};



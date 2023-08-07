import { PayloadAction } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'
import { CREATE_TABLE, FIND_ALL, FIND_BY_ID, FIND_TABLES_BY_PROJECT_ID } from '../../api/services/tableServices'
import { getAll, getById, getLatestTable, getTablesByProjectId } from '../../redux/reducers/tableSlice'
import { Table, TableDTO } from '../../types/Table.type'

export const createTable = function*(action : PayloadAction<TableDTO>) {
  try {
    let respone : Table = yield call(CREATE_TABLE, action.payload);
    yield put(getLatestTable(respone));
  } catch (error) {
    
  }
}

export const findTableByProjectId = function* (action: PayloadAction<number>){
  try {
    let response : Table[] = yield call(FIND_TABLES_BY_PROJECT_ID, action.payload);
    yield put(getTablesByProjectId(response));
  } catch (error) {

  }
}

export const findAll = function* () {
  try {
    let response: Table[] = yield call(FIND_ALL)
    yield put(getAll(response))
  } catch (error) {
    
  }
}

export const findById = function* ({payload}: PayloadAction<number>) {
  try {
    let response: Table = yield call(FIND_BY_ID, payload);
    yield put(getById(response))
  } catch (error) {
    
  }
}
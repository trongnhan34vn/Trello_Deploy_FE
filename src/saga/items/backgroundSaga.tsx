import { call, put } from 'redux-saga/effects';
import { FIND_ALL_BACKGROUNDS } from '../../api/services/backgroundServices';
import { getAllBGs } from '../../redux/reducers/backgroundSlice';
import { Background } from '../../types/Background.type';

export const findAllBackgrounds = function* () {
  try {
    let response : Background[] = yield call(FIND_ALL_BACKGROUNDS);
    yield put(getAllBGs(response))
  } catch (error) {
    
  }
}
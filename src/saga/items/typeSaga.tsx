import { call, put } from "redux-saga/effects";
import { FIND_ALL_TYPE_PROJECTS } from "../../api/services/typeServices";
import { getAllTypes } from "../../redux/reducers/typeProjectSlice";
import { TypeProject } from "../../types/TypeProject.type";

export const findAllTypeProjects = function* () {
  try {
    let response : TypeProject[] = yield call(FIND_ALL_TYPE_PROJECTS);
    yield put(getAllTypes(response));
  } catch (error) {
    console.log(error);
  }
}
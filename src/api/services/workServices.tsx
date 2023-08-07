import instance from "..";
import { Work, WorkDel, WorkForm } from "../../types/Work.type";

export const CREATE_WORK = async (data: WorkForm) => {
  await instance.post('/works', data);
}

export const FIND_BY_CARD_ID = async (id: number): Promise<Work[]> => {
  let response = await instance.get('/works?cardId=' + id);
  return response.data;
}

export const DELETE_WORK = async (data: WorkDel): Promise<void> => {
  await instance.delete('/works/' + data.id);
}
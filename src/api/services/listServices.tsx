import { DragList, List, ListForm } from '../../types/List.type';
import instance from '..';

export const FIND_LISTS_BY_TABLE_ID = async (
  tableId: number
): Promise<List[]> => {
  let response = await instance.get('/lists?tableId=' + tableId);
  return response.data;
};

export const UPDATE_DRAG_LIST = async (data: DragList): Promise<void> => {
  await instance.patch('/lists/' + data.id, { order: data.order });
};

export const CREATE_LIST = async (data: ListForm): Promise<void> => {
  await instance.post('/lists/', data);
};

export const FIND_LIST_BY_ID = async (id: number): Promise<List> => {
  let response = await instance.get('/lists/' + id);
  return response.data;
};

export const FIND_ALL = async (): Promise<List[]> => {
  let response = await instance.get('/lists');
  return response.data;
}

import instance from '..';
import { Label, LabelForm } from '../../types/Label.type';

export const FIND_ALL = async (): Promise<Label[]> => {
  let response = await instance.get('/labels');
  return response.data;
};

export const SEARCH_BY_NAME = async (data: string): Promise<Label[]> => {
  let response = await instance.get('/labels?name_like=' + data + '&label_name=' + data);
  return response.data;
};

export const CREATE = async (data: LabelForm): Promise<Label> => {
  let response = await instance.post('/labels', data);
  return response.data;
};

export const UPDATE = async (data: Label) => {
  await instance.put('/labels/' + data.id, data);
};

export const DELETE = async (id: number) => {
  await instance.delete('/labels/' + id);
}

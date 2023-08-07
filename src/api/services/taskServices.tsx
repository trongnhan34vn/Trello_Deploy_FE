import instance from '..';
import {
  Task,
  TaskForm,
  TaskStatus,
  TaskUpdateMember,
} from '../../types/Task.type';

export const CREATE_TASK = async (data: TaskForm): Promise<void> => {
  await instance.post('/tasks/', data);
};

export const FIND_ALL = async (): Promise<Task[]> => {
  let response = await instance.get('/tasks');
  return response.data;
};

export const CHANGE_STATUS = async (data: TaskStatus): Promise<void> => {
  await instance.patch(`/tasks/${data.id}`, { status: data.status });
};

export const UPDATE_MEMBER = async (data: TaskUpdateMember): Promise<void> => {
  await instance.patch(`/tasks/${data.id}`, { member: data.member });
};

export const DELETE  = async (id: number): Promise<void> => { 
  await instance.delete(`/tasks/${id}`);
}

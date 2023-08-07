import instance from '..';
import { Member, MemberForm, MemberUpdateCard, MemberUpdateRole, MemberUpdateTask } from '../../types/Member.type';

export const CREATE_MEMBER = async (data: MemberForm) => {
  await instance.post('/members', data);
};

export const FIND_BY_TABLE_ID = async (id: number): Promise<Member[]> => {
  let response = await instance.get('/members?tableId=' + id);
  return response.data;
}

export const UPDATE_ROLE = async (data: MemberUpdateRole): Promise<void> => {
  await instance.patch('/members/'+ data.id, {role: data.role});
}

export const UPDATE_TASK = async (data: MemberUpdateTask): Promise<void> => {
  await instance.patch('/members/'+ data.id, {taskId: data.taskId});
}

export const FIND_ALL = async (): Promise<Member[]> => {
  let response = await instance.get('/members');
  return response.data;
}

export const FIND_BY_USER_ID = async (id: number): Promise<Member[]> => {
  let response = await instance.get('/members?userId=' + id);
  return response.data;
}

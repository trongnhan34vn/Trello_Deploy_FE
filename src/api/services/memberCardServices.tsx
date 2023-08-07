import instance from '..';
import { MemberCard, MemberCardForm } from '../../types/MemberCard.type';

export const CREATE = async (data: MemberCardForm) => {
  await instance.post('/member-card', data);
};

export const DELETE_MC = async (id: number) => {
  await instance.delete('/member-card/' + id);
};

export const FIND_ALL = async (): Promise<MemberCard> => {
  let response = await instance.get('/member-card');
  return response.data;
};

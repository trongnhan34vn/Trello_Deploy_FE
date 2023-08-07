import instance from '..';
import { User, UserDTO, UserResponseLogin } from '../../types/User.type';

export const LOGIN = async (user: UserDTO): Promise<UserResponseLogin> => {
  let response = await instance.post('/signin', user);
  return response.data;
};

export const REGISTER = async (user: UserDTO) => {
  let response = await instance.post('/register', user);
  return response.data;
};

export const SEARCH_BY_EMAIL = async (data: string): Promise<User[]> => {
  let response = await instance.get('/users?email_like=' + data);
  return response.data;
};

export const FIND_BY_ID = async (id: number): Promise<User> => {
  let response = await instance.get('/users/' + id);
  return response.data;
};

export const FIND_ALL = async (): Promise<User[]> => {
  let response = await instance.get('/users');
  return response.data;
};

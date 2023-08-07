import instance from '..';
import { Project, ProjectDTO } from '../../types/Project.type';

export const CREATE_PROJECT = async (project: ProjectDTO) => {
  await instance.post('/projects', project);
};

export const FIND_PROJECTS_BY_USERID = async (
  id: number
): Promise<Project[]> => {
  let response = await instance.get(`/projects?userId=${id}`);
  return response.data;
};

export const FIND_BY_ID = async (id: number): Promise<Project> => {
  let response = await instance.get(`/projects/${id}`);
  return response.data;
};

export const FIND_ALL = async (): Promise<Project[]> => {
  let response = await instance.get(`/projects/`);
  return response.data;
};

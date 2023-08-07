import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectDTO } from '../../types/Project.type';
import { Table } from '../../types/Table.type';

const listProjects: Project[] = [];

export interface TableAction {
  index: number;
  tables: Table[];
}

interface ProjectState {
  listProjects: Project[];
  selectProject: Project | null;
  projects: Project[];
}

const initialState: ProjectState = {
  listProjects: [],
  selectProject: null,
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    createProject: (state, action: PayloadAction<ProjectDTO>) => {},
    findProjectsByUserId: (state, action: PayloadAction<number>) => {},
    getProjectsByUserId: (state, action: PayloadAction<Project[]>) => {
      state.listProjects = action.payload;
    },
    findById: (state, action: PayloadAction<number>) => {},
    getById: (state, action: PayloadAction<Project>) => {
      state.selectProject = action.payload;
    },
    findAll: () => {},
    getAll: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export default projectSlice.reducer;
export const {
  createProject,
  findProjectsByUserId,
  getProjectsByUserId,
  findById,
  getById,
  findAll,
  getAll
} = projectSlice.actions;

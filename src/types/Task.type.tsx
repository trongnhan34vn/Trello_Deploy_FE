import { User } from "./User.type";

export interface TaskForm {
  name: string;
  workId: number;
  endAt?: number;
  member?: number;
  status: boolean;
}

export interface Task extends TaskForm{
  id: number;
  createAt: number;
}


export interface TaskStatus {
  id: number;
  status: boolean;
}

export interface TaskUpdateMember {
  id: number;
  member: number | null;
}

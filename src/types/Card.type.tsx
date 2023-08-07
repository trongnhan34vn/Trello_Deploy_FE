export interface CardForm {
  name: string;
  listId: number;
  order: number;
  description: string;
  status: boolean
  endAt: number;
}

export interface CardDB extends CardForm {
  id: number;
  createdAt: number;
}

export interface CardPatch {
  id: number | undefined;
  listId: number;
  order: number;
}

export interface CardPatchTest {
  id: number;
  order: number;
  name: string;
  listId: number;
  description?: string;
}

export interface CardUpdateDescription {
  id: number;
  description: string;
}

export interface CardUpdateDate {
  id: number;
  createdAt: number;
  endAt: number;
}

export interface CardUpdateStatus {
  id: number;
  status: boolean
}

export interface CardUpdateName {
  id: number;
  name: string;
}



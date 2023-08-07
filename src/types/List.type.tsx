

export interface DragList  {
  id: number
  order: number
}

export interface List extends DragList {
  name: string
  tableId: number,
  createdAt: number
}

export interface ListForm {
  name: string
  tableId: number
  order: number
}
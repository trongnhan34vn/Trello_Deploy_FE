

export interface WorkForm {
  name: string
  cardId: number
  process: number
}

export interface Work extends WorkForm {
  id: number
  createAt: number
}

export interface WorkDel {
  id: number
  cardId: number
}

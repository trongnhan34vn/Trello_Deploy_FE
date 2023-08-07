export interface TableDTO {
  name: string,
  bgId?: number,
  projectId: number
}


export interface Table extends TableDTO {
  id: number,
}


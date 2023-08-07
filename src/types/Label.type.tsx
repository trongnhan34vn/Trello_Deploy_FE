export interface Label {
  id: number
  name: string
  code: string 
  labelName?: string
}


export interface LabelForm {
  name: string,
  labelName?: string,
  code: string
}
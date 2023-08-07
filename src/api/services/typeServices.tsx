import instance from ".."
import { TypeProject } from "../../types/TypeProject.type";


export const FIND_ALL_TYPE_PROJECTS = async () : Promise<TypeProject[]> => {
  let response = await instance.get('/typeProjects')
  return response.data;
}
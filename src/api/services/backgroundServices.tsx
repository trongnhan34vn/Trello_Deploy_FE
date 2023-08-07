import instance from "..";
import { Background } from "../../types/Background.type";

export const FIND_ALL_BACKGROUNDS = async () : Promise<Background[]> => {
  let response = await instance.get('/backgrounds')
  return response.data;
}
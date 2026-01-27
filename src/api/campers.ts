import axios from "axios";
import { Camper } from "../types/camper";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCampers = async (): Promise<
  Camper[] | { items: Camper[]; total: number }
> => {
  const response = await axios.get(API_URL!);
  return response.data;
};

import axios from "axios";
import { Camper } from "../types/camper";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

// Описываем, что функция возвращает промис с объектом, где есть массив Camper
export const getCampers = async (
  page: number,
  filters = {},
): Promise<{ items: Camper[]; total: number }> => {
  const response = await axios.get(API_URL, {
    params: {
      page,
      limit: 4,
      ...filters,
    },
  });
  return response.data;
};

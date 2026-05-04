import type { GET_JOKE } from "../types/type";
import { api } from "./api";

export const jokeSerice = {
  async getJoke({ signal, limit = 10, query = "science", page = 1 }: GET_JOKE) {
    const { data } = await api.get(
      `?limit=${limit}&query=${query}&page=${page}`,
      { signal },
    );

    return data;
  },
};

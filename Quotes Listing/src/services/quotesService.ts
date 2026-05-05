import type { GET_QUOTE } from "../types/type";
import api from "./api";

export const quotesService = {
  async getQuotes({ signal, page = 1, query = "", limit = 10 }: GET_QUOTE) {
    const { data } = await api.get(
      `?page=${page}&query=${query}&limit=${limit}`,
      { signal },
    );

    return data;
  },
};

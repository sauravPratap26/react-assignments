import type { GET_PRODUCTS } from "../types/type";
import api from "./api";

export const productService = {
  async getProducts({ signal, page, limit, query }: GET_PRODUCTS) {
    const { data } = await api.get(
      `?page=${page}&limit=${limit}&query=${query}&inc=null`,
      { signal },
    );
    return data;
  },
};

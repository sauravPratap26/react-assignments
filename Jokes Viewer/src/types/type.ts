export type GET_JOKE = {
  signal?: AbortSignal;
  limit?: number;
  query?: string;
  page?: number;
};

export type JOKE = {
  categories?: [];
  id: number;
  content: string;
};

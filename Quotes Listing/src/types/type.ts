export type GET_QUOTE = {
  signal?: AbortSignal;
  page?: number;
  query?: string;
  limit?: number;
};

export type Quote = {
  content: string;
  author: string;
  tags: string[];
  id: number | string;
};

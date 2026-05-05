export type GET_PRODUCTS = {
  signal: AbortSignal;
  page: number;
  limit: number;
  query: string;
};

export type PRODUCT = {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

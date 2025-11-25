export type FilterType = "all" | "favorites";

export type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  isLiked?: boolean;
  price: number;
  rating?: {
    count: number;
    rate: number;
  };
  title: string;
};

export type ProductFormData = {
  category: string;
  description: string;
  image: string;
  price: string;
  title: string;
};

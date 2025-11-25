import type { StateCreator } from "zustand";

import type { Product } from "../types";

export type ProductsSlice = {
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  products: Product[];
  toggleLike: (id: number) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
};

export const createProductsSlice: StateCreator<ProductsSlice> = (set, get) => ({
  addProduct: (newProductData) => {
    set((state) => {
      const maxId = state.products.reduce((max, p) => (p.id > max ? p.id : max), 0);
      const newProduct: Product = {
        ...newProductData,
        id: maxId + 1,
        isLiked: false,
      };

      return { products: [newProduct, ...state.products] };
    });
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
  getProductById: (id) => get().products.find((p) => p.id === id),
  products: [],
  toggleLike: (id) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, isLiked: !(p.isLiked ?? false) } : p)),
    }));
  },
  updateProduct: (id, data) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  },
});

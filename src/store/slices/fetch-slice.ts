import type { StateCreator } from "zustand";

import { DEFAULT_URL } from "@/config/const";

import { isProductArray } from "../guards";
import type { Product } from "../types";

export type FetchSlice = {
  error: null | string;
  fetchInitialProducts: () => Promise<void>;
  initializeProducts: (products: Product[]) => void;
  isLoading: boolean;

  products: Product[];
};

export const createFetchSlice: StateCreator<FetchSlice> = (set, get) => ({
  error: null,
  fetchInitialProducts: async () => {
    const { products } = get();

    if (products.length > 0) {
      return;
    }

    set({ error: null, isLoading: true });

    try {
      const response = await fetch(DEFAULT_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: unknown = await response.json();

      if (!isProductArray(data)) {
        throw new Error("Invalid product data response");
      }

      const initializedData = data.map((product) => ({ ...product, isLiked: product.isLiked ?? false }));

      set({ error: null, isLoading: false, products: initializedData });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products";

      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },
  initializeProducts: (products) => {
    const initializedData = products.map((product) => ({ ...product, isLiked: product.isLiked ?? false }));

    set({ error: null, isLoading: false, products: initializedData });
  },
  isLoading: false,
  products: [],
});

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createFetchSlice, type FetchSlice } from "@/store/slices/fetch-slice";
import { createFiltersSlice, type FiltersSlice } from "@/store/slices/filters-slice";
import { createProductsSlice, type ProductsSlice } from "@/store/slices/products-slice";

export const useProductStore = create<FetchSlice & FiltersSlice & ProductsSlice>()(
  persist(
    (...args) => ({
      ...createProductsSlice(...args),
      ...createFiltersSlice(...args),
      ...createFetchSlice(...args),
    }),
    {
      name: "products-storage",
    },
  ),
);

import type { StateCreator } from "zustand";

import type { FilterType } from "../types";

export type FiltersSlice = {
  categoryFilter: string;
  filter: FilterType;
  searchQuery: string;
  setCategoryFilter: (category: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
};

export const createFiltersSlice: StateCreator<FiltersSlice> = (set) => ({
  categoryFilter: "",
  filter: "all",
  searchQuery: "",
  setCategoryFilter: (category) => {
    set({ categoryFilter: category });
  },
  setFilter: (filter) => {
    set({ filter });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
});

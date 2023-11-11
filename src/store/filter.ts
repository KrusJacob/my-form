import { create } from "zustand";
import { TypeFilters } from "../types/filter";

interface userState {
  filter: TypeFilters;
  changeFilter: (filter: TypeFilters) => void;
}

export const useFilterStore = create<userState>()((set) => ({
  filter: "all",
  changeFilter: (fiter: TypeFilters) => set(() => ({ filter: fiter })),
}));

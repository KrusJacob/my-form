import { create } from "zustand";

interface userState {
  temp: string;
  changeTemp: (temp: string) => void;
}

export const useSearchStore = create<userState>()((set) => ({
  temp: "",
  changeTemp: (newTemp) => set(() => ({ temp: newTemp })),
}));

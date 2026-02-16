import { create } from "zustand";

interface CartState {
  count: number;
  setCount: (count: number) => void;
  add: (value: number) => void;
  minus: (value?: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  setCount: (count: number) => set(() => ({ count })),
  add: (value) => set((state) => ({ count: state.count + value })),
  minus: (value = 1) => set((state) => ({ count: state.count - value })),
}));

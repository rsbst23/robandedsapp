import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/types";

interface AuthStore {
  user: User | undefined;
  isAuthenticated: boolean;
  setUser: (user: User | undefined) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      logout: () =>
        set({
          user: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // name of the item in localStorage
    }
  )
);

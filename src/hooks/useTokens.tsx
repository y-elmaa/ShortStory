import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  name: string | null;
  userId: number | null;
  role: string | null;
  setToken: (token: string, name: string, userId: number, role: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      name: null,
      userId: null,
      role: null,

      setToken: (token, name, userId, role) =>
        set({ token, name, userId, role }),
      logout: () => set({ token: null, name: null, userId: null, role: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

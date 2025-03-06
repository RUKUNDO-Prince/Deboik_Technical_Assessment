import { create } from "zustand";

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  rehydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  rehydrateAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        set({ token, user: JSON.parse(user), isAuthenticated: true });
      }
    }
  },
}));

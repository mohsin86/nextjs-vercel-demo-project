

// USE IT
// const { user, logout } = useAuthStore();

// Now your logout becomes:

// <button onClick={logout}>Logout</button>


import { create } from 'zustand';

type AuthState = {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => {
    fetch('/api/logout', { method: 'POST' });
    set({ user: null });
  },
}));
// File: lib/store/useUserStore.ts
// This file defines a Zustand store for managing user state in the Next.js application. It provides a global state to store user information such as username and full name, along with functions to set and clear the user data. This allows components across the application to access and update user information without prop drilling.

/*
Usage like this in any component: see on login page for store usage: // File: app/login/page.tsx
    import { useUserStore } from '@/lib/store/useUserStore';
    const user = useUserStore((state) => state.user);
*/


import { create } from 'zustand';

type User = {
  username: string;
  fullName?: string;
  email?: string;
  number?: string;
  role: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  hydrateUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  hydrateUser: async () => {
    try {
      const res = await fetch('/api/front/me', {  credentials: 'include', // important sometimes
                          });

      if (!res.ok) {
        set({ user: null });
        return;
      }

      const data = await res.json();

      if (!data?.user) {
        set({ user: null });
        return;
      }
      console

      set({
        user: {
          username: data.user.username,
          fullName: data.user.fullName,
          email: data.user.email,
          number: data.user.number,
          role: data.user.role,
        },
      });
    } catch {
      set({ user: null });
    }
  },
}));
// File: lib/hooks/useUser.ts
// This hook fetches user data based on the provided username using React Query.

import { useQuery } from '@tanstack/react-query';

export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      const res = await fetch(`/api/front/users/${username}`);
      if (!res.ok) throw new Error('Failed to fetch user');
      return res.json();
    },
    enabled: !!username,
  });
}
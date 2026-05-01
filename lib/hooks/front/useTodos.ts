import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTodos(username: string) {
  return useQuery({
    queryKey: ['todos', username],
    queryFn: async () => {
      const res = await fetch(`/api/front/todos/${username}`);
      return res.json();
    },
  });
}
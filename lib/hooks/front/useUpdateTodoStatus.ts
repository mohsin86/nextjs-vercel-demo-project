import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTodoStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: any) => {
      const res = await fetch(`/api/front/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] }); // refresh user + todos
    },
  });
}
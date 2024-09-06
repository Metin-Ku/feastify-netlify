import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '../services/apiRecipes';
import toast from 'react-hot-toast';

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  const { mutate: addRecipe, isLoading: isCreating } = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      toast.success('New recipe successfully created');
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addRecipe };
}

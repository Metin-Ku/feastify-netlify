import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getRecipe } from '../services/apiRecipes';

export function useRecipe() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const {
    isLoading,
    data: { data: recipe } = { data: null },
    error,
  } = useQuery({
    queryKey: ['recipe', id],
    queryFn: async ({ queryKey }) => {
      const [_key, id] = queryKey;
      return await getRecipe({ id });
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  return { isLoading, error, recipe };
}

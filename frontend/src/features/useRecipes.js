import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getRecipes } from '../services/apiRecipes';

export function useRecipes() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('query');

  const {
    isLoading,
    data: { data: recipes } = { data: null },
    error,
  } = useQuery({
    queryKey: ['recipes', filter],
    queryFn: async ({ queryKey }) => {
      const [_key, filter] = queryKey;
      return await getRecipes({ filter });
    },
    enabled: !!filter, // If the filter exists, it activates the request, otherwise it does not.
    staleTime: Infinity, // Prevents data from being constantly refreshed
  });

  return { isLoading, error, recipes };
}

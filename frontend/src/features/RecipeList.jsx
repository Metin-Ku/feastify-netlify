import { useSearchParams } from 'react-router-dom';
import Empty from '../ui/Empty';
import Spinner from '../ui/Spinner';
import RecipeItem from './RecipeItem';
import { useRecipes } from './useRecipes';

// import { useRecipes } from "./useRecipes";
// import Pagination from "../../ui/Pagination";

function RecipeList({recipes}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [recipeId, setRecipeId] = useSearchParams();


  function handleRecipe(recipeId) {
    setRecipeId({ id: recipeId });
  }


  if (!query) return;

  if (recipes === undefined) return;

  // if (isLoading) return <Spinner />;

  // if (!recipes.length) return <Empty />;

  return recipes.map((recipe) => (
    <RecipeItem
      key={recipe._id}
      id={recipe._id}
      title={recipe.title}
      publisher={recipe.publisher}
      imageUrl={recipe.image_url}
      onClick={() => handleRecipe(recipe._id)}
    />
  ));
}

export default RecipeList;

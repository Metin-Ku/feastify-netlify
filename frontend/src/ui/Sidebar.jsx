import RecipeList from '../features/RecipeList';
import { useRecipes } from '../features/useRecipes';
import Empty from './Empty';
import Spinner from './Spinner';

function Sidebar() {
  const { recipes: recipes, isLoading, count } = useRecipes();

  if (recipes?.length === 0) {
    return (
      <div className='flex items-center justify-center mt-5'>
        <Empty />
      </div>
    );
  }

  return (
    <aside className='py-5'>
      {isLoading == true ? (
        <div className='flex items-center justify-center'>
          <Spinner />
        </div>
      ) : (
        <ul>
          <RecipeList recipes={recipes} />
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;

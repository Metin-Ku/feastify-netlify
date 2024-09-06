import Recipe from '../features/Recipe';

function Content({ recipe, isLoading }) {
  return <Recipe recipe={recipe} isLoading={isLoading} />;
}

export default Content;

import { useSearchParams } from "react-router-dom";

function RecipeItem({ id, title, publisher, imageUrl }) {

  const [recipe, setRecipe] = useSearchParams();

  function handleClick(e) {
    e.preventDefault();
    recipe.set('id', id);
    setRecipe(recipe);
  }

  return (
    <li className='cursor-pointer px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-100' onClick={handleClick}>
      <div className='flex items-center sm:gap-3 lg:gap-5'>
        <figure className='figure-small relative h-12 w-12 overflow-hidden rounded-full lg:h-16 lg:w-16'>
          <img
            className='block h-full w-full object-cover transition-all duration-300'
            src={imageUrl}
            alt=''
          />
        </figure>
        <div className='flex flex-col uppercase'>
          <p className='text-sm text-indigo-400 lg:text-base font-medium'>{title}</p>
          <span className='text-xs lg:text-sm'>{publisher}</span>
        </div>
      </div>
    </li>
  );
}

export default RecipeItem;

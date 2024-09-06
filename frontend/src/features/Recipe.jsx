import {
  BookmarkIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { IconContext } from 'react-icons';
import { useSearchParams } from 'react-router-dom';
import { useRecipe } from './useRecipe';
import { useState } from 'react';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';
import { useEffect } from 'react';
import { decimalToFraction, roundToNearestQuarter } from '../utils/helper';
import { FaArrowRight } from 'react-icons/fa6';

// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca3b

const recipeData = {
  status: 'success',
  data: {
    recipe: {
      publisher: 'A Spicy Perspective',
      ingredients: [
        { quantity: null, unit: '', description: 'For the pizza dough:' },
        { quantity: 1, unit: '', description: '1/2 tsp. dry active yeast' },
        { quantity: 0.75, unit: 'cup', description: 'warm water' },
        { quantity: 2, unit: '', description: 'tsp. sugar' },
        { quantity: 0.5, unit: 'cup', description: 'bread flour' },
        {
          quantity: 2,
          unit: '',
          description: 'tb. olive oil + extra for bowl',
        },
        { quantity: 1, unit: '', description: '1/2 tsp. sea salt' },
        { quantity: null, unit: '', description: 'For the greek pizza:' },
        { quantity: 1, unit: '', description: 'lb. pizza dough recipe above' },
        { quantity: 1, unit: '', description: 'lb. hummus any variety' },
        { quantity: 1, unit: 'cup', description: 'baby arugula' },
        {
          quantity: 0.67,
          unit: 'cup',
          description: 'good pitted greek olives',
        },
        {
          quantity: 0.67,
          unit: 'cup',
          description: 'cherry or grape tomatoes halved',
        },
        { quantity: 0.25, unit: 'cup', description: 'crumbled feta cheese' },
        { quantity: null, unit: '', description: 'Drizzle of good olive oil' },
      ],
      source_url:
        'http://www.aspicyperspective.com/2012/07/greek-pizza-grilled.html',
      image_url:
        'http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg',
      title: 'Greek Pizza',
      servings: 4,
      cooking_time: 75,
      id: '5ed6604591c37cdc054bca3b',
    },
  },
};

// Şimdi recipeData adlı bir const değişkeniniz var.

const image =
  'https://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg';

function Recipe({ recipe, isLoading }) {
  const [servings, setServings] = useState(0);

  // if(isLoading) return <Spinner />

  // if (recipe && servings === 0) {
  //   setServings(recipe.servings);
  // }

  // if (!recipe) return <Empty />;

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
    }
  }, [recipe]);

  if (isLoading)
    return (
      <div className='flex items-center justify-center'>
        <Spinner />
      </div>
    );
  // if (!recipe) {
  //   return (
  //     <div className='flex items-center justify-center'>
  //       <Empty />
  //     </div>
  //   );
  // }

  if (!recipe) return;

  function handleIncrease() {
    setServings(servings + 1);
  }

  function handleDecrease() {
    if (servings === 1) return;
    setServings(servings - 1);
  }

  const calculateNewQuantity = (
    originalQuantity,
    originalServings,
    newServings,
  ) => {
    if (originalQuantity == null) return;
    return (originalQuantity * newServings) / originalServings;
  };

  return (
    <div>
      <figure className='figure-large relative h-60'>
        <img
          className='block h-full w-full object-cover'
          src={recipe.image_url}
          alt=''
        />
        <h1 className='absolute bottom-0 left-1/2 w-3/4 -translate-x-1/2 translate-y-1/4 -skew-y-6 transform text-center text-3xl font-extrabold uppercase leading-tight text-white'>
          <span className='py-4.5 bg-gradient-to-br from-indigo-200 to-blue-500 box-decoration-clone px-8'>
            {recipe.title}
          </span>
        </h1>
      </figure>
      <div className='flex items-center gap-8 bg-blue-50 pb-8 pl-16 pr-16 pt-16'>
        <div className='flex items-center gap-1.5'>
          <ClockIcon className='h-6 w-6 fill-indigo-400' />
          <div className='flex items-center gap-1'>
            <span className='text-md font-semibold text-gray-700'>
              {recipe.cooking_time}
            </span>
            <span className='text-md uppercase text-gray-700'>Minutes</span>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-1.5'>
            <UserGroupIcon className='h-6 w-6 fill-indigo-400' />
            <div className='flex items-center gap-1'>
              <span className='text-md font-semibold text-gray-700'>
                {servings}
              </span>
              <span className='text-md uppercase text-gray-700'>Servings</span>
            </div>
            <div className='ml-2 flex items-center gap-px'>
              <button
                className='transition-all duration-500 hover:-translate-y-px'
                onClick={handleDecrease}
              >
                <MinusCircleIcon className='h-6 w-6 fill-indigo-400' />
              </button>
              <button
                className='transition-all duration-500 hover:-translate-y-px'
                onClick={handleIncrease}
              >
                <PlusCircleIcon className='h-6 w-6 fill-indigo-400' />
              </button>
            </div>
          </div>
        </div>
        <div></div>
        <button className='ml-auto rounded-full bg-indigo-400 p-2 transition-all duration-300 hover:scale-110'>
          <BookmarkIcon className='h-5 w-5 fill-white' />
        </button>
      </div>
      <div className='bg-[#e1efff] px-12 py-12'>
        <h3 className='p-4 text-center text-xl font-semibold uppercase text-indigo-500'>
          Recipe Ingredients
        </h3>
        <div className='px-6'>
          <ul className='flex flex-wrap text-stone-700'>
            {recipe.ingredients
              .filter((ingredient) => ingredient !== null)
              .map((ingredient) => (
                <li
                  key={ingredient._id}
                  className='text-md flex w-1/2 items-center gap-2 p-3'
                >
                  <CheckCircleIcon className='h-5 w-5 text-indigo-400' />{' '}
                  {/* {decimalToFraction(
                  calculateNewQuantity(
                    ingredient.quantity,
                    recipe.servings,
                    servings,
                  ),
                )} */}
                  {/* {ingredient.quantity &&
                  parseFloat(
                    (
                      (ingredient.quantity / recipe.servings) *
                      servings
                    ).toFixed(1),
                  )} */}
                  {/* <span><br></br></span> */}
                  {ingredient.quantity &&
                    roundToNearestQuarter(
                      (ingredient.quantity / recipe.servings) * servings,
                    ).toFixed(2)}
                  <span className=''>
                    {ingredient.unit} {ingredient.description}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='space-y-6 px-36 py-12  text-center'>
        <h2 className='text-2xl font-semibold text-indigo-500'>
          How to cook it
        </h2>
        <p className='text-base text-stone-500'>
          This recipe was carefully designed and tested by {recipe.publisher}.
          Please check out directions at their website.
        </p>
        {/* <a
          className='inline-flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-600'
          href={recipe.source_url}
        >
          <span>Directions</span>
          <svg className='ml-2 h-4 w-4'>
            <use href='https://forkify-v2.netlify.app/icons.c781f215.svg#icon-arrow-right'></use>
          </svg>
        </a> */}

        <a
          className='bg-main-500 text-md group relative inline-flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-full bg-indigo-500 px-6 font-medium text-white xs:w-max md:h-12'
          target='_blank'
          rel='noreferrer'
          href={recipe.source_url}
        >
          <span>Directions</span>
          <div className='w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100'>
            <FaArrowRight className='text-base' />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Recipe;

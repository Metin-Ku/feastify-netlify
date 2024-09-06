import {
  BookmarkIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

import Modal from 'react-modal';
import { useLogin } from '../features/useLogin';
import { useForm } from 'react-hook-form';
import { useCreateRecipe } from '../features/useCreateRecipe';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const customStyles = {
  content: {
    width: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderColor: '#cccccc63',
  },
  overlay: {
    backdropFilter: 'blur(2px)',
    backgroundColor: 'none',
  },
};

Modal.setAppElement('#root');

function Controls({ isAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cookies, setCookie] = useCookies(['auth']);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [addRecipeModalIsOpen, setAddRecipeModalIsOpen] = useState(false);
  const { login, isLoading: isLoginLoading } = useLogin();
  const { isCreating, addRecipe } = useCreateRecipe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    // const image = typeof data.image === 'string' ? data.image : data.image[0];

    data.ingredients = data.ingredients.map((ingredient) => {
      const [quantity, unit = '', description = ''] = ingredient.split(',');

      if (!quantity || !unit || !description) {
        return null; // Öğeyi atlamak için null döndür
      }

      if (!unit && !description) {
        return { quantity, unit: '', description: '' };
      }

      return { quantity, unit, description };
    });

    addRecipe(data, {
      onSuccess: (data) => {
        reset();
      },
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    document.body.style.filter = '';
    setIsOpen(false);
  }

  function openAddRecipeModal() {
    setAddRecipeModalIsOpen(true);
  }

  function closeAddRecipeModal() {
    document.body.style.filter = '';
    setAddRecipeModalIsOpen(false);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      },
    );
  }

  return (
    <>
      {/* {isAuthenticated ? (
        <div className='ml-auto flex items-center gap-2.5 self-stretch transition-all duration-75 hover:bg-blue-100'>
          <div className='flex items-center gap-1.5 fill-white p-4 uppercase'>
            <span className='text-sm text-gray-700 lg:text-lg'>
              Welcome {username}
            </span>
          </div>
        </div>
      ) : (
        <button
          className='ml-auto flex items-center gap-2.5 self-stretch transition-all duration-75 hover:bg-blue-100'
          onClick={openModal}
        >
          <div className='flex items-center gap-1.5 fill-white p-4 uppercase'>
            <UserIcon className='h-5 w-5 fill-indigo-600 lg:h-6 lg:w-6' />
            <span className='text-sm text-gray-700 lg:text-lg'>Login</span>
          </div>
        </button>
      )} */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button
          onClick={closeModal}
          className='ml-auto flex focus:outline-none'
        >
          <IoCloseCircle className='mb-8 h-8 w-8 fill-current text-indigo-600 transition-all duration-100 hover:text-indigo-400' />
        </button>
        <h2 className='mb-6 text-center text-2xl font-semibold uppercase'>
          Login
        </h2>
        <form className='flex flex-col space-y-4' onSubmit={handleLoginSubmit}>
          <input
            type='email'
            placeholder='Email'
            className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginLoading}
          />
          <input
            type='password'
            placeholder='Password'
            className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoginLoading}
          />
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-4 py-2 text-white transition-all duration-100 hover:bg-indigo-500'
          >
            Submit
          </button>
        </form>
      </Modal>
      <button
        className='flex items-center gap-2.5 self-stretch transition-all duration-75 hover:bg-blue-100'
        onClick={openAddRecipeModal}
      >
        <div className='flex items-center gap-1.5 fill-white p-4 uppercase'>
          <PencilSquareIcon className='h-5 w-5 fill-indigo-600 lg:h-6 lg:w-6' />
          <span className='text-sm text-gray-700 lg:text-lg'>Add recipe</span>
        </div>
      </button>
      <Modal
        isOpen={addRecipeModalIsOpen}
        onRequestClose={closeAddRecipeModal}
        style={customStyles}
      >
        <button
          onClick={closeAddRecipeModal}
          className='ml-auto flex focus:outline-none'
        >
          <IoCloseCircle className='mb-8 h-8 w-8 fill-current text-indigo-600 transition-all duration-100 hover:text-indigo-400' />
        </button>
        <h2 className='mb-6 text-center text-2xl font-semibold uppercase'>
          Add Recipe
        </h2>
        <form
          className='flex flex-col space-y-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-wrap justify-between gap-4'>
            <div className='flex flex-col'>
              <input
                type='text'
                placeholder='Title'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && (
                <span className='text-red-400'>{errors.title.message}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <input
                type='text'
                placeholder='URL'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('source_url', { required: 'URL is required' })}
              />
              {errors.source_url && (
                <span className='text-red-400'>
                  {errors.source_url.message}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <input
                type='text'
                placeholder='Image URL'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('image_url', {
                  required: 'Image URL is required',
                })}
              />
              {errors.image_url && (
                <span className='text-red-400'>{errors.image_url.message}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <input
                type='text'
                placeholder='Publisher'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('publisher', {
                  required: 'Publisher is required',
                })}
              />
              {errors.publisher && (
                <span className='text-red-400'>{errors.publisher.message}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <input
                type='number'
                placeholder='Prep time'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('cooking_time', {
                  required: 'Prep time is required',
                })}
              />
              {errors.cooking_time && (
                <span className='text-red-400'>
                  {errors.cooking_time.message}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <input
                type='number'
                placeholder='Servings'
                className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                {...register('servings', { required: 'Servings is required' })}
              />
              {errors.servings && (
                <span className='text-red-400'>{errors.servings.message}</span>
              )}
            </div>
            <div className='w-full'>
              <p className='font-medium uppercase'>Ingredients</p>
              <span className='text-sm text-slate-600'>Example: 250, grams, Cheese</span>
            </div>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div className='flex flex-col' key={index - 1}>
                <input
                  type='text'
                  placeholder={`${index}: qty, unit, description`}
                  className='rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
                  {...register(`ingredients[${index - 1}]`)}
                />
                {errors[`ingredient-${index - 1}`] && (
                  <span className='text-red-400'>
                    {errors[`ingredients${index - 1}`].message}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-4 py-2 text-white transition-all duration-100 hover:bg-indigo-500'
          >
            Submit
          </button>
        </form>
      </Modal>
      <button className='mr-8 flex items-center gap-2.5 self-stretch transition-all duration-75 hover:bg-blue-100'>
        <div className='flex items-center gap-1.5 fill-white p-4 uppercase'>
          <BookmarkIcon className='h-5 w-5 fill-indigo-600 lg:h-6 lg:w-6' />
          <span className='text-sm text-gray-700 lg:text-lg'>Bookmarks</span>
        </div>
      </button>
    </>
  );
}

export default Controls;

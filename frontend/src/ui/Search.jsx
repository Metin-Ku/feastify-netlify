import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRecipes } from '../features/useRecipes';
import { useSearchParams } from 'react-router-dom';


function Search() {
  const [search, setSearch] = useState('pizza');
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(e) {
    e.preventDefault();
    setSearchParams({ query: search });
  }

  return (
    <div className='mx-auto flex items-center'>
      <form
        className='form flex items-center rounded-full bg-white pl-6 transition-all duration-300 focus-within:-translate-y-0.5 lg:pl-12'
        onSubmit={handleSearch}
      >
        <input
          placeholder='Search over recipes...'
          className='w-44 text-sm outline-none lg:w-64 lg:text-base'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type='submit'
          className='flex items-center gap-2.5 rounded-full bg-indigo-500 px-8 py-3 uppercase transition-all duration-300 hover:scale-105'
        >
          <MagnifyingGlassIcon className='h-5 w-5 fill-white lg:h-6 lg:w-6' />
          <span className='text-sm text-white lg:text-base'>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Search;
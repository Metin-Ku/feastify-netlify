import { useRecipe } from '../features/useRecipe';
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';

function AppLayout({ isAuthenticated }) {
  const { recipe, isLoading, count } = useRecipe();

  return (
    <div className='bg-gradient-to-br from-indigo-200 to-blue-300'>
      <div className='mx-auto grid grid-cols-3 lg:container lg:max-w-screen-xl lg:py-20'>
        {/* Header */}
        <div className='col-span-3 h-24 bg-blue-50 lg:rounded-t-md'>
          <Header isAuthenticated={isAuthenticated} />
        </div>

        {/* Sidebar */}
        <div className='col-span-1 min-h-screen bg-slate-50 rounded-bl-md'>
          <Sidebar />
        </div>

        {/* Content */}
        <div
          className={`${isLoading && 'flex items-center justify-center'} col-start-2 col-end-4 min-h-screen bg-blue-50 lg:rounded-br-md`}
        >
          <Content recipe={recipe} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

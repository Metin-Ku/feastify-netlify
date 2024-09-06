import Controls from './Controls';
import Logo from './Logo';
import Search from './Search';

function Header({ isAuthenticated }) {
  return (
    <header className='flex items-center justify-between'>
      <Logo />
      <Search />
      <Controls isAuthenticated={isAuthenticated} />
    </header>
  );
}

export default Header;

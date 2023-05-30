import Link from 'next/link';
import HeaderButton from './HeaderButton';

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-color-primary py-8">
      <div className="container flex items-center justify-between">
        <Link
          href={'/'}
          className="flex items-center hover:text-color-tertiary"
        >
          Shop app <span className="material-symbols-rounded ml-1">apps</span>
        </Link>

        {/* @ts-expect-error Async Server Component */}
        <HeaderButton />
      </div>
    </header>
  );
};

export default Header;

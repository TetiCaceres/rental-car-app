'use client';
import css from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" prefetch={false}>
        <Image src="/logo.svg" alt="RentalCar" width={102} height={16} />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link
              href="/"
              prefetch={false}
              className={pathname === '/' ? css.active : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog/"
              className={pathname.startsWith('/catalog') ? css.active : ''}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

export interface IHeaderProps {
  className?: string;
}
const Header: React.FC<IHeaderProps> = ({ className, ...rest }) => {
  return (
    <header
      className={cn('header sticky top-0 z-50 bg-gray-100', className)}
      {...rest}
    >
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

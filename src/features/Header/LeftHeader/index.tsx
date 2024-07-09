'use client';
import { debounce } from 'lodash';
import { FC, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';
import TextInput from '@/components/TextInput';

export interface LeftHeaderProps {
  leftHeaderClass?: string;
  variant?: 'searchview' | 'runview';
  onSearch?: (searchTerm: string) => void;
}
const LeftHeader: FC<LeftHeaderProps> = ({
  leftHeaderClass,
  variant = 'searchview',
  onSearch,
}) => {
  return (
    <div
      className={cn(
        'left-header flex flex-row justify-center items-center gap-5',
        {
          ['py-2']: variant === 'searchview',
          ['']: variant === 'runview',
        },
        leftHeaderClass,
      )}
    >
      {variant === 'searchview' ? (
        <SearchView onSearch={onSearch} />
      ) : (
        <RunView />
      )}
    </div>
  );
};

export default LeftHeader;

const SearchView: FC<LeftHeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced function to delay API call
  const debouncedFetchUsers = debounce((term: string) => {
    onSearch?.(term);
  }, 500); // Adjust debounce delay as needed

  useEffect(() => {
    debouncedFetchUsers(searchTerm);
    return () => {
      debouncedFetchUsers.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <div className='px-5 py-2 border-[1px] h-[54px] items-center justify-center flex border-gray-600 rounded-xl'>
        <TextInput
          startAdornment={<SvgIcon name='search' />}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          classNames={{
            inputRoot: 'border-none border-0 p-0 gap-3',
            input:
              'border-0 border-none placeholder:text-gray-300 text-white h-3.5 font-medium text-sm font-primary leading-[14px]',
          }}
        />
      </div>
      <div className='px-[15px] w-[54px] flex justify-center items-center h-[54px] py-[18px] border-[1px] border-gray-600 rounded-xl'>
        <SvgIcon name='sort' />
      </div>
    </>
  );
};

const RunView: FC<LeftHeaderProps> = () => {
  return <>live view</>;
};

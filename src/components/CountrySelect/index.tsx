import React, { useMemo, useRef, useState } from 'react';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { COUNTRY_LIST } from '@/constant/countryList';

interface CountrySelectProps {
  value: string;
  onChange: (value: string, text: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    onChange(e.target.value, selectedOption.dataset.countryname || '');
    setIsOpen(false);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const memoizedCountryOptions = useMemo(
    () =>
      COUNTRY_LIST.map((country) => (
        <option
          key={country.code}
          className='p-2 border-b hover:bg-gray-600 active:bg-gray-600 border-gray-800'
          value={country.dial_code}
          data-countryname={country.name}
        >
          {`${country.name} (${country.dial_code})`}
        </option>
      )),
    [],
  );

  return (
    <div className='relative flex items-center w-full'>
      {isOpen && (
        <select
          ref={selectRef}
          className='font-primary text-xs rounded-xl font-semibold bg-gray-900 text-white h-[80vh] p-2 absolute z-10'
          onChange={handleSelectChange}
          onBlur={() => setIsOpen(false)}
          value={value}
          size={COUNTRY_LIST.length}
        >
          {memoizedCountryOptions}
        </select>
      )}
      <button
        type='button'
        className='font-primary w-full flex flex-row text-xs text-white p-0 border-none bg-transparent'
        onClick={toggleSelect}
      >
        <Typo>{value}</Typo>
        <SvgIcon name='down-arrow' />
      </button>
    </div>
  );
};

export default CountrySelect;

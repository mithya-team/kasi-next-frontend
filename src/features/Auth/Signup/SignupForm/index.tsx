import { FC, useRef, useState } from 'react';

import TextInput from '@/components/TextInput';

import { COUNTRY_LIST } from '@/constant/countryList';
import { SignUpProps } from '@/features/Auth/Signup';

interface SignupFormProps extends SignUpProps {}

const fieldConfig = [
  {
    label: 'UserName',
    type: 'text',
  },
  {
    label: 'Email',
    type: 'text',
  },
  {
    label: 'Mobile number',
    type: 'text',
    hasAdornment: true,
  },
  {
    label: 'Password',
    type: 'password',
  },
  {
    label: 'Retype password',
    type: 'password',
  },
];

const SignupForm: FC<SignupFormProps> = () => {
  const [selectedDialCode, setSelectedDialCode] = useState(
    COUNTRY_LIST[0].dial_code,
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDialCode(e.target.value);
    setIsSelectOpen(false);
  };

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className='flex flex-col gap-4 w-full text-left'>
      {fieldConfig.map((field, index) => (
        <div key={index}>
          {field.hasAdornment ? (
            <div className='relative flex items-center'>
              {isSelectOpen && (
                <select
                  ref={selectRef}
                  className='font-primary text-xs text-gray-500 h-[100vh] p-2 absolute z-10'
                  onChange={handleSelectChange}
                  onBlur={() => setIsSelectOpen(false)}
                  value={selectedDialCode}
                  size={COUNTRY_LIST.length}
                >
                  {COUNTRY_LIST.map((country) => (
                    <option key={country.code} value={country.dial_code}>
                      {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>
              )}
              <TextInput
                type={field.type}
                label={field.label}
                classNames={{
                  label: 'font-primary text-xs text-gray-500 h-5 mb-0',
                  inputRoot: 'h-6 p-0',
                  input: 'font-primary font-medium text-base text-white p-0',
                }}
                className='border-b pt-2 gap-1.5 border-b-gray-500 flex-1'
                startAdornment={
                  <button
                    className='font-primary text-xs text-gray-500 h-6 p-0 border-none bg-transparent'
                    onClick={toggleSelect}
                  >
                    {selectedDialCode}
                  </button>
                }
              />
            </div>
          ) : (
            <TextInput
              type={field.type}
              label={field.label}
              classNames={{
                label: 'font-primary text-xs text-gray-500 h-5 mb-0',
                inputRoot: 'h-6 p-0',
                input: 'font-primary font-medium text-base text-white p-0',
              }}
              className='border-b pt-2 gap-1.5 border-b-gray-500'
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SignupForm;

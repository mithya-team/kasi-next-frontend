/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikErrors, FormikTouched } from 'formik';
import React, { useState } from 'react';

import CountrySelect from '@/components/CountrySelect';
import PasswordInput from '@/components/PasswordInput';
import TextInput from '@/components/TextInput';

import { COUNTRY_LIST } from '@/constant/countryList';
import { SignupFormConfig } from '@/features/Auth/Signup/config';
import { FormDataWithTerms } from '@/features/Auth/Signup/SignupForm';

interface InputWrapperProps {
  field: SignupFormConfig;
  values: FormDataWithTerms;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<FormDataWithTerms>;
  touched: FormikTouched<FormDataWithTerms>;
  setFieldValue: (field: string, value: any) => void;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  field,
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) => {
  const { label, name, type, hasAdornment } = field;
  const [selectedDialCode, setSelectedDialCode] = useState(
    COUNTRY_LIST[0].dial_code,
  );

  const handleSelectChange = (value: string, text: string) => {
    setFieldValue('phone.countryCode', value);
    setFieldValue('phone.countryCodeText', text);
    setSelectedDialCode(value);
  };

  const renderInput = () => {
    const showError = (touched as any)[name] && (errors as any)[name];

    if (hasAdornment) {
      return (
        <TextInput
          type={field.type}
          label={field.label}
          classNames={{
            label: 'font-primary text-xs text-gray-500 h-5 mb-0',
            input:
              'font-primary font-medium text-base text-white p-1 pl-4 mb-1 border-l h-6 border-gray-700',
            startAdornment: 'min-w-fit',
          }}
          className=' flex-1 w-full'
          startAdornment={
            <CountrySelect
              value={selectedDialCode}
              onChange={handleSelectChange}
            />
          }
          name={field.name}
          value={(values as any)[field.name]}
          onChange={handleChange}
          error={showError ? (errors as any)[field.name] : undefined}
        />
      );
    } else if (type === 'password') {
      return (
        <PasswordInput
          label={label}
          className='w-full'
          name={name}
          value={(values as any)[name]}
          onChange={handleChange}
          error={showError ? (errors as any)[name] : undefined}
        />
      );
    } else {
      return (
        <TextInput
          type={type}
          label={label}
          className='w-full'
          name={name}
          value={(values as any)[name]}
          onChange={handleChange}
          error={showError ? (errors as any)[name] : undefined}
        />
      );
    }
  };

  return <>{renderInput()}</>;
};

export default InputWrapper;

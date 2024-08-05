import { FormikErrors, FormikProps } from 'formik';
import { FC } from 'react';

import TextInput from '@/components/TextInput';

import {
  NameFormValues,
  SettingItemFormValues,
} from '@/app/(account)/settings/@types';

const NameSetting: FC<FormikProps<SettingItemFormValues>> = ({
  handleChange,
  values,
  errors,
}) => {
  const nameErrors = errors as FormikErrors<NameFormValues>;
  const nameValue = values as NameFormValues;
  return (
    <TextInput
      id='name'
      name='name'
      type='text'
      label='Name'
      onChange={handleChange}
      value={nameValue?.name}
      error={nameErrors?.name}
      className='w-full mt-2'
    />
  );
};

export default NameSetting;

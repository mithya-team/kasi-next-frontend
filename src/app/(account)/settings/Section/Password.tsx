import { FormikErrors, FormikProps } from 'formik';
import React, { FC } from 'react';

import PasswordInput from '@/components/PasswordInput';

import {
  PasswordFormValues,
  SettingItemFormValues,
} from '@/app/(account)/settings/@types';

const Password: FC<FormikProps<SettingItemFormValues>> = ({
  handleChange,
  errors,
  values,
}) => {
  const passwordFields = values as PasswordFormValues;
  const passwordErrors = errors as FormikErrors<PasswordFormValues>;
  return (
    <>
      <PasswordInput
        id='oldPassword'
        name='oldPassword'
        label='Enter your current Password'
        onChange={handleChange}
        value={passwordFields.oldPassword}
        error={passwordErrors.oldPassword}
        className='w-full mt-2'
      />

      <PasswordInput
        id='newPassword'
        name='newPassword'
        label='New Password'
        onChange={handleChange}
        value={passwordFields.newPassword}
        error={passwordErrors.newPassword}
        className='w-full mt-2'
      />
      <PasswordInput
        id='confirmNewPassword'
        name='confirmNewPassword'
        label='Retype New Password'
        onChange={handleChange}
        value={passwordFields.confirmNewPassword}
        error={passwordErrors.confirmNewPassword}
        className='w-full mt-2'
      />
    </>
  );
};

export default Password;

import { FormikErrors, FormikProps } from 'formik';
import { FC } from 'react';

import TextInput from '@/components/TextInput';

import {
  EmailFormValues,
  SettingItemFormValues,
} from '@/app/(account)/settings/@types';

const EmailSetting: FC<FormikProps<SettingItemFormValues>> = ({
  handleChange,
  values,
  errors,
}) => {
  const emailErrors = errors as FormikErrors<EmailFormValues>;
  const emailValue = values as EmailFormValues;
  return (
    <TextInput
      id='email'
      name='email'
      type='email'
      label='Email'
      onChange={handleChange}
      value={emailValue?.email}
      error={emailErrors?.email}
    />
  );
};

export default EmailSetting;

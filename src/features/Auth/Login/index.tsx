import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC } from 'react';

import AuthFormFooter from '@/components/AuthFormFooter';
import PrimaryButton from '@/components/Buttons1/PrimaryButton';
import SecondaryButton from '@/components/Buttons1/SecondaryButton';
import PasswordInput from '@/components/PasswordInput';
import TextInput from '@/components/TextInput';

import { initialValues } from '@/features/Auth/Login/config';
import { schema } from '@/features/Auth/Login/schema';
import SocialAuth from '@/features/Auth/SocialAuth';
import { LoginFormData } from '@/models/auth/auth.types';

export interface LoginProps {
  onSignupPress: () => void;
  onLogin: (values: LoginFormData) => void;
  onForgotPasswordClick: () => void;
}
const classNames = {
  label: 'text-xs text-gray-500 mb-0',
  inputRoot: 'p-0 border-b border-b-gray-500 rounded-none',
  input: 'font-primary font-medium text-base text-white p-0',
};

const Login: FC<LoginProps> = ({
  onSignupPress,
  onLogin,
  onForgotPasswordClick,
}) => {
  const handleSubmit = async (
    values: LoginFormData,
    { setSubmitting }: FormikHelpers<LoginFormData>,
  ) => {
    await onLogin(values);
    setSubmitting(false);
  };

  return (
    <Formik<LoginFormData>
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        isSubmitting,
        touched,
      }: FormikProps<LoginFormData>) => (
        <Form className='flex flex-col gap-7 text-white'>
          <div className='flex flex-col gap-4 text-left'>
            <TextInput
              label='Email'
              classNames={classNames}
              className='gap-1.5 pt-2 w-full'
              name='email'
              value={values?.email}
              onChange={handleChange}
              error={touched?.email ? errors?.email : undefined}
            />
            <PasswordInput
              label='Password'
              classNames={classNames}
              className='gap-1.5 pt-2 w-full'
              name='password'
              value={values?.password}
              onChange={handleChange}
              error={touched?.password ? errors?.password : undefined}
            />
            <div className='text-right'>
              <SecondaryButton
                onClick={onForgotPasswordClick}
                titleClass='text-red-300 text-xs font-secondary'
              >
                Forgot password?
              </SecondaryButton>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <PrimaryButton type='submit' isLoading={isSubmitting}>
              Login
            </PrimaryButton>
            <div className='border-0 bg-gradient-to-r h-12 p-[0.5px] rounded-[10px] from-linear-1 to-linear-2'>
              <SocialAuth title='Sign in with Google' />
            </div>
          </div>
          <AuthFormFooter
            onClick={onSignupPress}
            primaryText='Sign up'
            helperText='Don’t have an account?'
          />
        </Form>
      )}
    </Formik>
  );
};

export default Login;

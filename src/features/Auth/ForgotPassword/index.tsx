import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { FC, useEffect, useState } from 'react';

import AuthFormFooter from '@/components/AuthFormFooter';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import TextInput from '@/components/TextInput';
import Typo from '@/components/typography/Typo';

import { schema } from '@/features/Auth/ForgotPassword/schema';
import { ForgotPasswordFormData } from '@/models/auth/auth.types';

export interface ForgotPasswordProps {
  onGoBack: () => void;
  onForgotPassword: (values: ForgotPasswordFormData) => void;
}

const initialValues = {
  email: '',
};

const ForgotPassword: FC<ForgotPasswordProps> = ({
  onGoBack,
  onForgotPassword: onResetPassword,
}) => {
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  const handleSubmit = async (
    values: ForgotPasswordFormData,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormData>,
  ) => {
    await onResetPassword(values);
    setSubmitting(false);
    setLinkSent(true);
    setTimer(60);
    setIsResendEnabled(false);
  };

  return (
    <Formik<ForgotPasswordFormData>
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
      }: FormikProps<ForgotPasswordFormData>) => (
        <Form className='flex flex-col gap-7 font-secondary font-semibold text-xl text-center text-white'>
          <Typo classes='font-primary text-base -mt-5 text-gray-500'>
            Enter the email tied to your account
          </Typo>
          <div className='flex flex-col gap-4 text-left'>
            <TextInput
              label='Email address'
              className='gap-1.5 pt-2 w-full'
              name='email'
              value={values?.email}
              onChange={handleChange}
              error={errors?.email}
            />
          </div>
          <PrimaryButton
            type='submit'
            isLoading={isSubmitting}
            disabled={isSubmitting || (!isResendEnabled && linkSent)}
          >
            {linkSent && !isResendEnabled
              ? 'Sent Link'
              : isResendEnabled
                ? 'Resent link'
                : 'Reset Password'}
          </PrimaryButton>

          {linkSent && !isResendEnabled ? (
            <div className='text-center'>
              <AuthFormFooter
                helperText="Didn't receive the email? Resend available in"
                primaryText={`00:${timer < 10 ? `0${timer}` : timer}`}
              />
            </div>
          ) : linkSent && isResendEnabled ? null : (
            <AuthFormFooter
              onClick={onGoBack}
              primaryText='Go back'
              helperText='Remember your password?'
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;

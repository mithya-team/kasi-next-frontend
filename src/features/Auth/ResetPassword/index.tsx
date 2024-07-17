'use client';
import { Form, Formik, FormikProps } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';

import PrimaryButton from '@/components/Buttons1/PrimaryButton';
import PasswordInput from '@/components/PasswordInput';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions } from '@/store';

import { AuthDialogType, ResetFormData } from '@/models/auth/auth.types';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

interface ResetPasswordProps {
  isResetPasswordSuccessful: boolean;
  onResetPassword: (values: ResetFormData) => Promise<void>;
}

const ResetPassword: FC<ResetPasswordProps> = ({
  isResetPasswordSuccessful,
  onResetPassword,
}) => {
  if (isResetPasswordSuccessful) return <SuccessContent />;
  return <ResetForm onResetPassword={onResetPassword} />;
};

export default ResetPassword;

const SuccessContent = () => {
  const { openDialog } = useStoreActions(({ DialogStore: { openDialog } }) => ({
    openDialog,
  }));
  return (
    <div className='flex flex-col justify-center items-center gap-7 mt-5 font-secondary font-semibold text-xl text-center text-white'>
      <SvgIcon name='success' />
      <div className='flex gap-2 flex-col items-center justify-center text-center'>
        <Typo level='h2' classes='font-secondary'>
          Password changed successfully
        </Typo>
        <Typo classes='font-primary text-base text-center text-gray-500'>
          The password was successfully changed. Use it to log in to the app.
        </Typo>
      </div>
      <PrimaryButton
        onClick={() => {
          openDialog(AuthDialogType.LOGIN);
        }}
      >
        Continue to login
      </PrimaryButton>
    </div>
  );
};

interface ResetFormProps {
  onResetPassword: ResetPasswordProps['onResetPassword'];
}

const ResetForm: FC<ResetFormProps> = ({ onResetPassword }) => {
  return (
    <Formik<ResetFormData>
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onResetPassword}
    >
      {({
        values,
        handleChange,
        errors,
        isSubmitting,
        touched,
      }: FormikProps<ResetFormData>) => (
        <Form className='flex flex-col gap-7 font-secondary font-semibold text-xl text-center text-white'>
          <Typo classes='font-primary text-base -mt-5 text-gray-500'>
            Your new password must be different from previous used password
          </Typo>
          <div className='flex flex-col gap-4 text-left'>
            <PasswordInput
              label='Password'
              className='gap-1.5 pt-2 w-full'
              name='password'
              value={values?.password}
              onChange={handleChange}
              error={touched?.password ? errors?.password : undefined}
              helperText='Must be at least 8 characters'
            />
            <PasswordInput
              label='Confirm Password'
              className='gap-1.5 pt-2 w-full'
              name='confirmPassword'
              value={values?.confirmPassword}
              onChange={handleChange}
              error={
                touched?.confirmPassword ? errors?.confirmPassword : undefined
              }
            />
            {touched.confirmPassword &&
              values.password &&
              values.confirmPassword &&
              values.password === values.confirmPassword && (
                <div className=' flex flex-row gap-1 -mt-2'>
                  <SvgIcon name='matched' />
                  <Typo classes='text-xs font-primary font-medium text-green-500'>
                    Both password match
                  </Typo>
                </div>
              )}
          </div>
          <PrimaryButton type='submit' isLoading={isSubmitting}>
            Reset Password
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

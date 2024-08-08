'use client';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { toast } from '@/lib/toast';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import PasswordInput from '@/components/PasswordInput';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { PasswordFormValues } from '@/app/(account)/settings/@types';
import { ROUTE } from '@/constant/route';
import adminModel from '@/models/admin/admin.model';

const Email: FC = () => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdmin } = useStoreActions(({ AdminStore: { setAdmin } }) => ({
    setAdmin,
  }));

  const router = useRouter();

  const onAction = async (values: PasswordFormValues) => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.updatePassword(admin?._id, {
        newPassword: (values as PasswordFormValues)?.newPassword,
        oldPassword: (values as PasswordFormValues)?.oldPassword,
      });
      if (res) setAdmin(res);

      router.push(ROUTE.SETTING_ROUTE.path);
      toast.success('Edit successful!');
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <Formik<PasswordFormValues>
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onAction}
    >
      {({ handleChange, isSubmitting, errors, values }) => (
        <Form className='flex flex-col gap-9 justify-center mt-[60px] items-center mx-auto w-[25rem]'>
          <Typo
            level='h2'
            classes='text-white tracking-[-0.225px] font-semibold font-secondary text-center'
          >
            Change your password
          </Typo>
          <PasswordInput
            id='oldPassword'
            name='oldPassword'
            label='Enter your current Password'
            onChange={handleChange}
            value={values.oldPassword}
            error={errors.oldPassword}
            className='w-full mt-2'
          />

          <PasswordInput
            id='newPassword'
            name='newPassword'
            label='New Password'
            onChange={handleChange}
            value={values.newPassword}
            error={errors.newPassword}
            className='w-full mt-2'
          />
          <PasswordInput
            id='confirmNewPassword'
            name='confirmNewPassword'
            label='Retype New Password'
            onChange={handleChange}
            value={values.confirmNewPassword}
            error={errors.confirmNewPassword}
            className='w-full mt-2'
          />

          <PrimaryButton type='submit' isLoading={isSubmitting}>
            Reset password
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};
export default Email;

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

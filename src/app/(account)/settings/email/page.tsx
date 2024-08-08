'use client';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as Yup from 'yup';

import { toast } from '@/lib/toast';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import TextInput from '@/components/TextInput';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { EmailFormValues } from '@/app/(account)/settings/@types';
import { ROUTE } from '@/constant/route';
import adminModel from '@/models/admin/admin.model';

const Email: FC = () => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdmin } = useStoreActions(({ AdminStore: { setAdmin } }) => ({
    setAdmin,
  }));

  const router = useRouter();

  const onAction = async (values: EmailFormValues) => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.updateAdmin(admin._id, {
        email: values.email,
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
    <Formik<EmailFormValues>
      initialValues={{ email: admin?.email ?? '' }}
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
            Change your email
          </Typo>
          <TextInput
            id='email'
            name='email'
            type='email'
            label='Email'
            onChange={handleChange}
            value={values?.email}
            error={errors?.email}
            className='w-full mt-2'
          />

          <PrimaryButton type='submit' isLoading={isSubmitting}>
            Save
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};
export default Email;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
});

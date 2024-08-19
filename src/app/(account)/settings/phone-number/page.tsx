'use client';
import { isAxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import * as yup from 'yup';

import { toast } from '@/lib/toast';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import CountrySelect from '@/components/CountrySelect';
import TextInput from '@/components/TextInput';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { ROUTE } from '@/constant/route';
import adminModel from '@/models/admin/admin.model';
import { TPhone } from '@/models/auth/auth.types';

const PhoneNumber: FC = () => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdmin } = useStoreActions(({ AdminStore: { setAdmin } }) => ({
    setAdmin,
  }));

  const router = useRouter();

  const onAction = async (values: TPhone) => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.updateAdmin(admin._id, {
        phone: values,
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
    <Formik<TPhone>
      initialValues={{
        countryCode: admin?.phone?.countryCode ?? '',
        countryCodeText: admin?.phone?.countryCodeText ?? '',
        number: admin?.phone?.number ?? '',
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onAction}
    >
      {({ handleChange, isSubmitting, errors, values, setFieldValue }) => (
        <Form className='flex flex-col gap-9 mt-[60px] justify-center items-center mx-auto w-[25rem]'>
          <Typo
            level='h2'
            classes='text-white tracking-[-0.225px] font-semibold font-secondary text-center'
          >
            Change your phone number
          </Typo>
          <TextInput
            label='Phone number'
            name='number'
            classNames={{
              label: 'font-primary text-xs text-gray-500 h-5 mb-0',
              input:
                'font-primary font-medium text-base text-white p-1 pl-4 mb-1 border-l h-6 border-gray-700',
              startAdornment: 'min-w-fit',
            }}
            className=' flex-1 w-full'
            startAdornment={
              <CountrySelect
                value={values?.countryCode ?? admin?.phone?.countryCode ?? ''}
                onChange={(value, text) => {
                  setFieldValue('countryCode', value);
                  setFieldValue('countryCodeText', text);
                }}
              />
            }
            value={values?.number}
            onChange={handleChange}
            error={errors?.number}
          />

          <PrimaryButton type='submit' isLoading={isSubmitting}>
            Save
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};
export default PhoneNumber;

const validationSchema = yup.object().shape({
  number: yup.string().required('Phone number is required'),
  countryCode: yup.string().required('Country code is required'),
  countryCodeText: yup.string().required('Required'),
});

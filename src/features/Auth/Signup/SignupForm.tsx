/* eslint-disable unused-imports/no-unused-vars */
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { FC } from 'react';

import PrimaryButton from '@/components/Buttons1/PrimaryButton';
import CheckboxInput from '@/components/CheckboxInput';

import { SignUpProps } from '@/features/Auth/Signup';
import { fieldConfig, initialValues } from '@/features/Auth/Signup/config';
import InputWrapper from '@/features/Auth/Signup/InputWrapper';
import { schema } from '@/features/Auth/Signup/schema';
import { SignupFormData } from '@/models/auth/auth.types';

interface SignupFormProps extends SignUpProps {
  onSignup: (values: SignupFormData) => Promise<void>;
}

export interface FormDataWithTerms extends SignupFormData {
  confirmPassword: string;
  terms: boolean;
}

const SignupForm: FC<SignupFormProps> = ({ onSignup }) => {
  const handleSubmit = async (
    values: FormDataWithTerms,
    { setSubmitting }: FormikHelpers<FormDataWithTerms>,
  ) => {
    const { confirmPassword, terms, ...signupData } = values;
    await onSignup(signupData);
    setSubmitting(false);
  };

  return (
    <Formik<FormDataWithTerms>
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldValue,
        isSubmitting,
        touched,
      }: FormikProps<FormDataWithTerms>) => (
        <Form className='flex flex-col gap-7'>
          <div className='flex flex-col gap-4 w-full text-left'>
            {fieldConfig.map((field) => (
              <InputWrapper
                key={field.name}
                field={field}
                values={values}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
                touched={touched}
              />
            ))}
          </div>
          <CheckboxInput
            label='Accept terms and conditions'
            checked={values.terms}
            onChange={handleChange}
            name='terms'
            helperText='You agree to our Terms of Service and Privacy Policy.'
            labelClassName='font-primary font-medium text-gray-50 text-sm leading-[14px]'
            checkboxClassName='w-[14px] h-[14px] rounded-[2px] border border-gray-10'
            helperTextClassName='font-primary text-gray-500 text-sm text-left'
            error={touched.terms ? errors.terms : undefined}
          />
          <PrimaryButton type='submit' isLoading={isSubmitting}>
            Signup
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import useAsyncTask from '@/hooks/useAsyncTask';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import TertiaryButton from '@/components/Buttons/TertiaryButton';
import Typo from '@/components/typography/Typo';

import {
  SettingItemFormValues,
  SettingItemType,
} from '@/app/(account)/settings/@types';
import Code from '@/app/(account)/settings/Section/Code';
import Email from '@/app/(account)/settings/Section/Email';
import Name from '@/app/(account)/settings/Section/Name';
import Password from '@/app/(account)/settings/Section/Password';

interface SettingItemProps {
  itemId: SettingItemType;
  onAction: (values: SettingItemFormValues) => void;
  onRegenerateCoachCode: () => Promise<void>;
}
const SettingItem: FC<SettingItemProps> = ({
  itemId,
  onAction,
  onRegenerateCoachCode,
}) => {
  const regenerateCodeTask = useAsyncTask(onRegenerateCoachCode);
  return (
    <Formik<SettingItemFormValues>
      initialValues={getInitialValues(itemId)}
      validationSchema={getValidationSchema(itemId)}
      enableReinitialize
      onSubmit={onAction}
    >
      {(formik) => (
        <Form className='flex flex-col gap-9 justify-center items-center mx-auto w-[25rem]'>
          <Typo
            level='h2'
            classes='text-white tracking-[-0.225px] font-semibold font-secondary text-center'
          >
            {getHeading(itemId)}
          </Typo>
          {itemId === SettingItemType.NAME && <Name {...formik} />}
          {itemId === SettingItemType.EMAIL && <Email {...formik} />}
          {itemId === SettingItemType.CODE && <Code />}
          {itemId === SettingItemType.PASSWORD && <Password {...formik} />}
          <div className='flex flex-row w-full gap-5'>
            {itemId === SettingItemType.CODE ? (
              <TertiaryButton
                onClick={() => regenerateCodeTask.run()}
                isLoading={regenerateCodeTask.isLoading}
              >
                Regenerator
              </TertiaryButton>
            ) : null}
            <PrimaryButton type='submit' isLoading={formik.isSubmitting}>
              {itemId === SettingItemType.PASSWORD ? 'Reset password' : 'Save'}
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default SettingItem;

const getInitialValues = (itemId: SettingItemType): SettingItemFormValues => {
  switch (itemId) {
    case SettingItemType.EMAIL:
      return { email: '' };
    case SettingItemType.NAME:
      return { name: '' };
    case SettingItemType.PASSWORD:
      return { oldPassword: '', newPassword: '', confirmNewPassword: '' };
    default:
      return { name: '' };
  }
};

const getValidationSchema = (itemId: SettingItemType) => {
  switch (itemId) {
    case SettingItemType.EMAIL:
      return Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
      });
    case SettingItemType.NAME:
      return Yup.object().shape({
        name: Yup.string().required('Required'),
      });
    case SettingItemType.PASSWORD:
      return Yup.object().shape({
        oldPassword: Yup.string().required('Required'),
        newPassword: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Required'),
        confirmNewPassword: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'Passwords must match')
          .required('Confirm password is required'),
      });
    default:
      return Yup.object();
  }
};

const getHeading = (itemId: SettingItemType) => {
  switch (itemId) {
    case SettingItemType.EMAIL:
      return 'Change your email';
    case SettingItemType.NAME:
      return 'Change your name';
    case SettingItemType.PASSWORD:
      return 'Change your password';
    case SettingItemType.CODE:
      return 'Code';
    default:
      return '';
  }
};

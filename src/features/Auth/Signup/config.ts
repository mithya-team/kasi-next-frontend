import { COUNTRY_LIST } from '@/constant/countryList';
import { FormDataWithTerms } from '@/features/Auth/Signup/SignupForm';

export interface SignupFormConfig {
  label: string;
  name: string;
  type: string;
  hasAdornment?: boolean;
}
export const fieldConfig: SignupFormConfig[] = [
  {
    label: 'UserName',
    name: 'fullName',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
  },
  {
    label: 'Mobile number',
    name: 'phone.number',
    type: 'text',
    hasAdornment: true,
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
  },
  {
    label: 'Retype password',
    type: 'password',
    name: 'confirmPassword',
  },
];

export const initialValues: FormDataWithTerms = {
  fullName: '',
  email: '',
  phone: {
    number: '',
    countryCode: COUNTRY_LIST[0].dial_code,
    countryCodeText: COUNTRY_LIST[0].name,
  },
  password: '',
  confirmPassword: '',
  terms: false,
};

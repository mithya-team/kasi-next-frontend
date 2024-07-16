import * as yup from 'yup';

export const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.object().shape({
    number: yup.string().required('Phone number is required'),
    countryCode: yup.string().required('Country code is required'),
  }),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

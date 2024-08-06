import { User } from '@/models/user/user.types';

export interface TPhone {
  number: string;
  countryCode: string;
  countryCodeText: string;
}
export interface SignupFormData {
  email: string;
  phone: TPhone;
  password: string;
  fullName: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupResponse {
  user: User | null;
  emailDetails: {
    emailVerificationSent: boolean;
    emailErrorStack: null;
  };
}

export enum AuthDialogType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

export interface JwtDecodeResponse {
  sub: string;
  iat: number;
  exp: number;
}

export interface ForgotPasswordFormData {
  email: string;
}
export interface ResetFormData {
  confirmPassword: string;
  password: string;
}

// components/AuthDialog.tsx
import { isAxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { toast } from '@/lib/toast';
import useAuthActions from '@/hooks/useAuthActions';

import Dialog from '@/components/Dialog';

import { useStoreActions, useStoreState } from '@/store';

import ForgotPassword from '@/features/Auth/ForgotPassword';
import Login from '@/features/Auth/Login';
import ResetPassword from '@/features/Auth/ResetPassword';
import SignUp from '@/features/Auth/Signup';
import authModel from '@/models/auth/auth.model';
import {
  AuthDialogType,
  ForgotPasswordFormData,
  LoginFormData,
  ResetFormData,
  SignupFormData,
} from '@/models/auth/auth.types';

const AuthDialog = () => {
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const [isResetPasswordSuccessful, setIsResetPasswordSuccessful] =
    useState(false);
  const { dialogType, isOpen } = useStoreState(
    ({ DialogStore: { isOpen, dialogType } }) => ({
      isOpen,
      dialogType,
    }),
  );

  const { closeDialog, openDialog } = useStoreActions(
    ({ DialogStore: { closeDialog, openDialog } }) => ({
      closeDialog,
      openDialog,
    }),
  );

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { signUp, login } = useAuthActions();
  const router = useRouter();

  const onSignup = async (values: SignupFormData) => {
    await signUp(values);
    closeDialog();
    setShowSignupForm(false);
    router.push('/');
  };

  const onLogin = async (values: LoginFormData) => {
    await login(values);
    closeDialog();
    router.push('/');
  };

  const onResetPassword = async (values: ForgotPasswordFormData) => {
    try {
      await authModel.forgotPasword(values);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const handleSubmit = async (values: ResetFormData) => {
    try {
      if (!token) return;
      await authModel.ResetPassword(token, values.password);
      setIsResetPasswordSuccessful(true);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const getContent = (type: AuthDialogType | null) => {
    switch (type) {
      case AuthDialogType.LOGIN:
        return (
          <Login
            onForgotPasswordClick={() =>
              openDialog(AuthDialogType.FORGOT_PASSWORD)
            }
            onLogin={onLogin}
            onSignupPress={() => openDialog(AuthDialogType.SIGNUP)}
          />
        );
      case AuthDialogType.SIGNUP:
        return (
          <SignUp
            redirectToLogin={() => openDialog(AuthDialogType.LOGIN)}
            onSignup={onSignup}
            showSignupForm={showSignupForm}
            onSignupWithEmailClick={() => setShowSignupForm(true)}
          />
        );
      case AuthDialogType.FORGOT_PASSWORD:
        return (
          <ForgotPassword
            onGoBack={() => openDialog(AuthDialogType.LOGIN)}
            onResetPassword={onResetPassword}
          />
        );

      case AuthDialogType.RESET_PASSWORD:
        return (
          <ResetPassword
            isResetPasswordSuccessful={isResetPasswordSuccessful}
            onResetPassword={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (dialogType === AuthDialogType.SIGNUP && showSignupForm)
          setShowSignupForm(false);
        closeDialog();
      }}
      closeOnBgPress={dialogType !== AuthDialogType.RESET_PASSWORD}
      headingText={getHeading(dialogType, isResetPasswordSuccessful)}
    >
      {getContent(dialogType)}
    </Dialog>
  );
};

export default AuthDialog;

const getHeading = (
  type: AuthDialogType | null,
  isResetPasswordSuccessful: boolean,
) => {
  switch (type) {
    case AuthDialogType.LOGIN:
      return 'Sign In';
    case AuthDialogType.SIGNUP:
      return 'Sign Up';
    case AuthDialogType.FORGOT_PASSWORD:
      return 'Forgot Password';
    case AuthDialogType.RESET_PASSWORD:
      return isResetPasswordSuccessful ? undefined : 'Enter your new password';
    default:
      return '';
  }
};

/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { isAxiosError } from 'axios';
import React, { FC, useState } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Loader from '@/components/Loader';

interface CheckoutFormProps {
  clientSecret: string;
  handleOnSuccess: () => void;
}
const CheckoutForm: FC<CheckoutFormProps> = ({
  clientSecret,
  handleOnSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isReady, setIsReady] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error('Payment Error!');
      return;
    }
    // Confirm the Intent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    } else {
      toast.success('Payment Successful!');
      handleOnSuccess();
    }
    setIsLoading(false);
  };

  return (
    <>
      <div
        className={cn('relative h-[60vh] w-full', {
          hidden: isReady,
        })}
      >
        <Loader />
      </div>
      <form
        id='payment-form'
        onSubmit={handleSubmit}
        className={cn({
          invisible: !isReady,
        })}
      >
        <PaymentElement
          id='payment-element'
          options={{
            layout: 'tabs',
          }}
          onReady={(e) => {
            setIsReady(true);
            e.on('change', (e) => {
              if (e.complete) {
                setIsFormFilled(true);
              } else {
                setIsFormFilled(false);
              }
            });
          }}
        />
        <div className='flex justify-end mt-5'>
          <PrimaryButton
            disabled={!stripe || !elements || !isFormFilled}
            isLoading={isLoading}
            id='submit'
            type='submit'
            className='uppercase text-lg'
          >
            Pay now
          </PrimaryButton>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;

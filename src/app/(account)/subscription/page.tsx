'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { toast } from '@/lib/toast';

import Dialog from '@/components/Dialog';
import SubscriptionCard from '@/components/SubscriptionCard';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import SubscriptionInfo from '@/app/(account)/subscription/SubscriptionInfo';
import Success from '@/app/(account)/subscription/Success';
import { APP_CONFIG } from '@/constant/config';
import CheckoutForm from '@/features/Auth/CheckoutForm';
import ConfirmationDialog from '@/features/ConfirmationDialog';
import adminModel from '@/models/admin/admin.model';
import {
  ActiveProduct,
  SubscriptionProducts,
  SubscriptionProductsDetails,
} from '@/models/admin/admin.types';

const stripeKey = APP_CONFIG.STRIPE_PUBLISHABLE_KEY;
let stripePromise: Promise<Stripe | null>;
if (stripeKey) stripePromise = loadStripe(stripeKey);
const SubscriptionScreen = () => {
  const [openPaymentDialog, setPaymentDialog] = useState(false);
  const [subscriptionProducts, setSubscriptionProducts] =
    useState<SubscriptionProducts>();
  const [activeSubscription, setActiveSubscription] = useState<ActiveProduct>();
  const [clientSecret, setClientSecret] = useState<string>();
  const [openCancelSubscriptionDialog, setOpenCancelSubscriptionDialog] =
    useState(false);
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await adminModel.productsList();
      const activeProduct = await adminModel.getActiveProduct();
      if (activeProduct) setActiveSubscription(activeProduct[0]);
      if (res) setSubscriptionProducts(res);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnSubscribe = async (product: SubscriptionProductsDetails) => {
    try {
      const res = await adminModel.getClientSecret(product?.planId);
      if (res?.paymentIntent) {
        setClientSecret(res.paymentIntent);
        setPaymentDialog(true);
      }
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const openCancelPlanDialog = async () =>
    setOpenCancelSubscriptionDialog(true);

  const cancelSubscription = async () => {
    if (!activeSubscription?.subscription) return;
    try {
      await adminModel.cancelSubscription(
        activeSubscription?.subscription?.stripeSubscriptionId,
      );
      setOpenCancelSubscriptionDialog(false);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const handleOnPaymentSuccess = () => {
    setPaymentDialog(false);
    setPaymentSuccessful(true);
  };

  if (isPaymentSuccessful)
    return <Success onContinue={() => setPaymentSuccessful(false)} />;

  return (
    <div className='mx-auto flex flex-col w-[53.75rem] items-center gap-9 py-10'>
      {activeSubscription ? (
        activeSubscription.planId === 'NONE' ||
        activeSubscription.creditDurationInDays <= 0 ? (
          <>
            <SubscriptionInfo />
            <div className='grid grid-cols-2 gap-x-5 gap-y-5'>
              {subscriptionProducts && (
                <SubscriptionCard
                  onClick={handleOnSubscribe}
                  product={subscriptionProducts?.PAID_TIER_1_MONTH}
                />
              )}
              {subscriptionProducts && (
                <SubscriptionCard
                  onClick={handleOnSubscribe}
                  product={subscriptionProducts?.PAID_TIER_6_MONTHS}
                />
              )}
              {subscriptionProducts && (
                <SubscriptionCard
                  onClick={handleOnSubscribe}
                  product={subscriptionProducts?.PAID_TIER_12_MONTHS}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <Typo
              level='h2'
              classes='text-white font-secondary font-semibold tracking-[-0.225px]'
            >
              My current plan
            </Typo>
            <SubscriptionCard
              isActive
              onClick={openCancelPlanDialog}
              product={activeSubscription}
            />
          </>
        )
      ) : null}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setPaymentDialog(false)}
        hasKasiIcon={false}
      >
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
              appearance: {
                theme: 'stripe',
              },
            }}
          >
            <CheckoutForm
              clientSecret={clientSecret}
              handleOnSuccess={handleOnPaymentSuccess}
            />
          </Elements>
        ) : null}
      </Dialog>
      <ConfirmationDialog
        open={openCancelSubscriptionDialog}
        onClose={() => setOpenCancelSubscriptionDialog(false)}
        onAgree={cancelSubscription}
        agreeText='Cancel plan'
      >
        <SvgIcon name='remove-user' />
        <div className='flex flex-col justify-center items-center gap-5'>
          <Typo
            level='h2'
            classes='font-secondary font-semibold text-white text-center tracking-[-0.225px]'
          >
            Confirm Cancellation of Membership Plan
          </Typo>
          <Typo classes='font-primary text-gray-500 text-center'>
            Canceling your membership will end all benefits as soon as your
            active cycle is over.{' '}
          </Typo>
        </div>
      </ConfirmationDialog>
    </div>
  );
};

export default SubscriptionScreen;

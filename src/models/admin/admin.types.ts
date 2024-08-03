import {
  AthleteSubscription,
  ProductPlanId,
  User,
} from '@/models/user/user.types';

export type UnConfirmedUserStatus =
  | 'requested'
  | 'connected'
  | 'disconnected'
  | 'declined';
export interface UnConfirmedUser {
  _id: string;
  userId: string;
  coachId: string;
  status?: UnConfirmedUserStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UnConfirmedUserWithDetails
  extends Omit<UnConfirmedUser, 'userId'>,
    User {}

export interface SubscriptionProductsDetails {
  creditDurationInDays: number;
  creditDurationInMonths: number;
  name: string;
  amount: number;
  currency: string;
  timeString: string;
  stripePricingId: string;
  planId: ProductPlanId;
}

export interface SubscriptionProducts {
  PAID_TIER_1_MONTH: SubscriptionProductsDetails;
  PAID_TIER_6_MONTHS: SubscriptionProductsDetails;
  PAID_TIER_12_MONTHS: SubscriptionProductsDetails;
}

export interface PaymentIntentResponse {
  publishableKey: string;
  paymentIntent: string;
  customer: string;
  ephemeralKey: string;
}

export interface ActiveProduct extends SubscriptionProductsDetails {
  subscription: AthleteSubscription['subscription'];
}

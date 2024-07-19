export interface UserPreferences {
  dateOfBirth: string;
  maxHeartRate: number;
  voiceType: string;
  distanceUnit: string;
  bestTime: BestTime;
  bestTimeResults: BestTimeResult[];
  _id: string;
}

export interface AthleteSubscription {
  creditDurationInDays: number;
  creditDurationInMonths: number;
  name: string;
  amount: number;
  currency: string;
  timeString: string;
  planId: ProductPlanId;
  subscription?: {
    _id: string;
    userId: string;
    stripeSubscriptionId: string;
    planId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    currentPeriodEnd?: string;
    currentPeriodStart?: string;
  };
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  userPreferences: UserPreferences;
  roles: string[];
  athleteSubscription: AthleteSubscription[];
  stripeCustomerId?: string;
}

export interface UserListResponse {
  total: number;
  page: number;
  limit: number;
  data: User[];
}

export interface UsersListParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export type ProductPlanId =
  | 'FREE_TIER'
  | 'NONE'
  | 'PAID_TIER_1_MONTH'
  | 'PAID_TIER_12_MONTHS';

interface BestTime {
  paceType: string;
  completionPace: string;
  paceUnit: string;
  _id: string;
}

interface BestTimeResult {
  paceType: string;
  minPace: string;
  maxPace: string;
  paceUnit: string;
  _id: string;
}

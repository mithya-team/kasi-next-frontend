import React, { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';
import ActiveSubscription from '@/components/SvgIcon/ActiveSubscription';
import CallIcon from '@/components/SvgIcon/Call';
import ClockIcon from '@/components/SvgIcon/Clock';
import CoachRun from '@/components/SvgIcon/CoachRun';
import CodeIcon from '@/components/SvgIcon/Code';
import CopyIcon from '@/components/SvgIcon/Copy';
import CrossIcon from '@/components/SvgIcon/Cross';
import DeleteUserIcon from '@/components/SvgIcon/DeleteUser';
import DistanceIcon from '@/components/SvgIcon/Distance';
import DobIcon from '@/components/SvgIcon/Dob';
import DownArrowIcon from '@/components/SvgIcon/DownArrow';
import DurationIcon from '@/components/SvgIcon/Duration';
import ElapsedDistanceIcon from '@/components/SvgIcon/ElapsedDistance';
import ElapsedTimeIcon from '@/components/SvgIcon/ElapsedTime';
import EmailIcon from '@/components/SvgIcon/Email';
import EmptyUserListIcon from '@/components/SvgIcon/EmptyUserListIcon';
import EmptyUserWorkoutIcon from '@/components/SvgIcon/EmptyUserWorkout';
import EndCallIcon from '@/components/SvgIcon/EndCall';
import ErrorIcon from '@/components/SvgIcon/Error';
import ExpandedIcon from '@/components/SvgIcon/Expanded';
import ExpiredIcon from '@/components/SvgIcon/Expired';
import GoogleIcon from '@/components/SvgIcon/Google';
import HeartRateIcon from '@/components/SvgIcon/HeartRate';
import HideIcon from '@/components/SvgIcon/Hide';
import KasiIcon from '@/components/SvgIcon/Kasi';
import LogoutIcon from '@/components/SvgIcon/Logout';
import MatchedIcon from '@/components/SvgIcon/Matched';
import MuteIcon from '@/components/SvgIcon/Mute';
import NonExpandedIcon from '@/components/SvgIcon/NonExpanded';
import NotificationIcon from '@/components/SvgIcon/Notification';
import OverviewImageIcon from '@/components/SvgIcon/OverviewImage';
import PaceIcon from '@/components/SvgIcon/Pace';
import PaymentIcon from '@/components/SvgIcon/Payment';
import PaymentSuccessIcon from '@/components/SvgIcon/PaymentSuccess';
import ProfileIcon from '@/components/SvgIcon/profile';
import RemoveUserIcon from '@/components/SvgIcon/RemoveUser';
import RightArrowIcon from '@/components/SvgIcon/RightArrow';
import RunIcon from '@/components/SvgIcon/Run';
import SearchIcon from '@/components/SvgIcon/SearchIcon';
import SettingIcon from '@/components/SvgIcon/Setting';
import ShowIcon from '@/components/SvgIcon/Show';
import SortIcon from '@/components/SvgIcon/Sort';
import SubscriptionIcon from '@/components/SvgIcon/Subscription';
import SuccessIcon from '@/components/SvgIcon/Success';
import TabsBorderIcon from '@/components/SvgIcon/TabsBorder';
import ThreeDots from '@/components/SvgIcon/ThreeDots';
import UnmuteIcon from '@/components/SvgIcon/Unmute';
import UpcomingRunIcon from '@/components/SvgIcon/UpcomingRun';
import UpdatePasswordIcon from '@/components/SvgIcon/UpdatePassword';
import UserIcon from '@/components/SvgIcon/User';
import UserDialogIcon from '@/components/SvgIcon/UserDialog';
import UsersIcon from '@/components/SvgIcon/Users';
import VoiceIcon from '@/components/SvgIcon/Voice';

export interface ISvgIconProps extends SvgIconProps {
  name: IconName;
}

export type IconName =
  | 'run'
  | 'profile'
  | 'down-arrow'
  | 'notification'
  | 'sort'
  | 'users'
  | 'search'
  | 'cross'
  | 'three-dots'
  | 'user'
  | 'dob'
  | 'distance'
  | 'heart-rate'
  | 'clock'
  | 'subscription'
  | 'voice'
  | 'google'
  | 'kasi'
  | 'hide'
  | 'show'
  | 'success'
  | 'error'
  | 'matched'
  | 'payment'
  | 'setting'
  | 'logout'
  | 'right-arrow'
  | 'call'
  | 'overview-image'
  | 'tabs-border'
  | 'empty-workout'
  | 'duration'
  | 'pace'
  | 'expanded'
  | 'non-expanded'
  | 'upcoming'
  | 'empty-user-list'
  | 'user-dialog'
  | 'copy'
  | 'delete-user'
  | 'elapsed-time'
  | 'elapsed-distance'
  | 'end-call'
  | 'mute'
  | 'unmute'
  | 'coach-run'
  | 'remove-user'
  | 'payment-success'
  | 'code'
  | 'update-password'
  | 'email'
  | 'expired'
  | 'active-subscription';

const IconMap: Record<IconName, FC<Omit<ISvgIconProps, 'name'>>> = {
  run: RunIcon,
  profile: ProfileIcon,
  'down-arrow': DownArrowIcon,
  notification: NotificationIcon,
  sort: SortIcon,
  users: UsersIcon,
  search: SearchIcon,
  cross: CrossIcon,
  'three-dots': ThreeDots,
  user: UserIcon,
  dob: DobIcon,
  distance: DistanceIcon,
  'heart-rate': HeartRateIcon,
  clock: ClockIcon,
  subscription: SubscriptionIcon,
  voice: VoiceIcon,
  google: GoogleIcon,
  kasi: KasiIcon,
  hide: HideIcon,
  show: ShowIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  matched: MatchedIcon,
  payment: PaymentIcon,
  setting: SettingIcon,
  logout: LogoutIcon,
  'right-arrow': RightArrowIcon,
  call: CallIcon,
  'overview-image': OverviewImageIcon,
  'tabs-border': TabsBorderIcon,
  'empty-workout': EmptyUserWorkoutIcon,
  pace: PaceIcon,
  duration: DurationIcon,
  expanded: ExpandedIcon,
  'non-expanded': NonExpandedIcon,
  upcoming: UpcomingRunIcon,
  'empty-user-list': EmptyUserListIcon,
  'user-dialog': UserDialogIcon,
  copy: CopyIcon,
  'delete-user': DeleteUserIcon,
  'elapsed-distance': ElapsedDistanceIcon,
  'elapsed-time': ElapsedTimeIcon,
  'end-call': EndCallIcon,
  mute: MuteIcon,
  unmute: UnmuteIcon,
  'coach-run': CoachRun,
  'remove-user': RemoveUserIcon,
  'payment-success': PaymentSuccessIcon,
  'update-password': UpdatePasswordIcon,
  code: CodeIcon,
  email: EmailIcon,
  expired: ExpiredIcon,
  'active-subscription': ActiveSubscription,
};

const SvgIcon: FC<ISvgIconProps> = ({ name, ...svgProps }) => {
  const getIcon = () => {
    if (!name) return null;
    const IconCmp = IconMap[name];
    return <IconCmp {...svgProps} />;
  };

  return <>{getIcon()}</>;
};

export default SvgIcon;

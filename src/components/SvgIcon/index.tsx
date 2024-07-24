import React, { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';
import CallIcon from '@/components/SvgIcon/Call';
import ClockIcon from '@/components/SvgIcon/Clock';
import CopyIcon from '@/components/SvgIcon/Copy';
import CrossIcon from '@/components/SvgIcon/Cross';
import DeleteUserIcon from '@/components/SvgIcon/DeleteUser';
import DistanceIcon from '@/components/SvgIcon/Distance';
import DobIcon from '@/components/SvgIcon/Dob';
import DownArrowIcon from '@/components/SvgIcon/DownArrow';
import DurationIcon from '@/components/SvgIcon/Duration';
import ElapsedDistanceIcon from '@/components/SvgIcon/ElapsedDistance';
import ElapsedTimeIcon from '@/components/SvgIcon/ElapsedTime';
import EmptyUserListIcon from '@/components/SvgIcon/EmptyUserListIcon';
import EmptyUserWorkoutIcon from '@/components/SvgIcon/EmptyUserWorkout';
import ErrorIcon from '@/components/SvgIcon/Error';
import ExpandedIcon from '@/components/SvgIcon/Expanded';
import GoogleIcon from '@/components/SvgIcon/Google';
import HeartRateIcon from '@/components/SvgIcon/HeartRate';
import HideIcon from '@/components/SvgIcon/Hide';
import KasiIcon from '@/components/SvgIcon/Kasi';
import LogoutIcon from '@/components/SvgIcon/Logout';
import MatchedIcon from '@/components/SvgIcon/Matched';
import NonExpandedIcon from '@/components/SvgIcon/NonExpanded';
import NotificationIcon from '@/components/SvgIcon/Notification';
import OverviewImageIcon from '@/components/SvgIcon/OverviewImage';
import PaceIcon from '@/components/SvgIcon/Pace';
import PaymentIcon from '@/components/SvgIcon/Payment';
import ProfileIcon from '@/components/SvgIcon/profile';
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
import UpcomingRunIcon from '@/components/SvgIcon/UpcomingRun';
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
  | 'elapsed-distance';

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

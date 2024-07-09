import React, { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';
import ClockIcon from '@/components/SvgIcon/Clock';
import CrossIcon from '@/components/SvgIcon/Cross';
import DistanceIcon from '@/components/SvgIcon/Distance';
import DobIcon from '@/components/SvgIcon/Dob';
import DownArrowIcon from '@/components/SvgIcon/DownArrow';
import HeartRateIcon from '@/components/SvgIcon/HeartRate';
import NotificationIcon from '@/components/SvgIcon/Notification';
import ProfileIcon from '@/components/SvgIcon/profile';
import RunIcon from '@/components/SvgIcon/Run';
import SearchIcon from '@/components/SvgIcon/SearchIcon';
import SortIcon from '@/components/SvgIcon/Sort';
import SubscriptionIcon from '@/components/SvgIcon/Subscription';
import ThreeDots from '@/components/SvgIcon/ThreeDots';
import UserIcon from '@/components/SvgIcon/user';
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
  | 'voice';

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

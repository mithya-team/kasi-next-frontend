import cn, { ClassValue } from 'clsx';
import React, { FC } from 'react';
import { IconBaseProps, IconType as ReactIconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';
import {
  LuArrowLeft,
  LuArrowRight,
  LuCreditCard,
  LuLaptop,
  LuPhone,
  LuPlus,
  LuShield,
} from 'react-icons/lu';
import { RiAlarmWarningFill } from 'react-icons/ri';

export type IconType = ReactIconType;
export interface IconProps extends IconBaseProps {
  classNames?: {
    container?: ClassValue;
    element?: ClassValue;
  };
  name: IconName;
}

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'plus'
  | 'laptop'
  | 'credit-card'
  | 'shield'
  | 'spinner'
  | 'phone'
  | 'alarm-warning';

export const IconMap: Record<IconName, IconType> = {
  'alarm-warning': RiAlarmWarningFill,
  'arrow-left': LuArrowLeft,
  'arrow-right': LuArrowRight,
  'credit-card': LuCreditCard,
  laptop: LuLaptop,
  phone: LuPhone,
  plus: LuPlus,
  shield: LuShield,
  spinner: ImSpinner2,
};

const Icon: FC<IconProps> = (props) => {
  const { classNames, name, ...svgProps } = props;

  const getIcon = (svgProps: IconBaseProps) => {
    if (!name) return null;
    const IconCmp = IconMap[name];
    return <IconCmp className={cn(classNames?.element)} {...svgProps} />;
  };

  return (
    <span className={cn(classNames?.container, 'Icon-component')}>
      {getIcon(svgProps)}
    </span>
  );
};

export default Icon;

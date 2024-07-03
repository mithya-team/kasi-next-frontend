import * as React from 'react';

import { getButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import { IconType } from '@/components/icons/Icon';
import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

import { ButtonVariant } from '@/@types/ButtonsStyles';

export type IconLinkProps = {
  isDarkBg?: boolean;
  variant?: ButtonVariant;
  icon?: IconType;
  classNames?: {
    icon?: string;
  };
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      isDarkBg = false,
      classNames,
      ...rest
    },
    ref
  ) => {
    const { baseClasses, variantClasses } = getButtonStyles(
      variant,
      'base',
      isDarkBg
    );

    const IconButtonClasses = cn(
      baseClasses,
      'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
      variantClasses,
      className
    );

    return (
      <UnstyledLink
        ref={ref}
        type='button'
        className={IconButtonClasses}
        {...rest}
      >
        {Icon && <Icon size='1em' className={cn(classNames?.icon)} />}
      </UnstyledLink>
    );
  }
);

export default IconLink;

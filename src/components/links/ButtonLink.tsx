import * as React from 'react';

import { getButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import { IconType } from '@/components/icons/Icon';
import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

import { ButtonSize, ButtonVariant } from '@/@types/ButtonsStyles';

export type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconType;
  rightIcon?: IconType;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref
  ) => {
    const { baseClasses, sizeClasses, variantClasses } = getButtonStyles(
      variant,
      size,
      isDarkBg
    );

    const ButtonClasses = cn(
      baseClasses,
      sizeClasses,
      variantClasses,
      className
    );
    return (
      <UnstyledLink ref={ref} {...rest} className={ButtonClasses}>
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-1',
              size === 'sm' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'md:text-md text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.leftIcon
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'text-md md:text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.rightIcon
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;

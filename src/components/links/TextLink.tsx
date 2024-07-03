import * as React from 'react';

import { getTextButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

import { TextButtonVariant } from '@/@types/ButtonsStyles';

export type TextLinkProps = {
  variant?: TextButtonVariant;
} & UnstyledLinkProps;

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, children, variant = 'primary', ...rest }, ref) => {
    const { baseClasses, variantClasses } = getTextButtonStyles(variant);
    const TextButtonClasses = cn(baseClasses, variantClasses, className);
    return (
      <UnstyledLink ref={ref} {...rest} className={TextButtonClasses}>
        {children}
      </UnstyledLink>
    );
  }
);

export default TextLink;

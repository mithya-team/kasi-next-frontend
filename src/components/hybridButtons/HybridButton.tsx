import React from 'react';

import Button, { ButtonProps } from '@/components/buttons/Button';
import ButtonLink, { ButtonLinkProps } from '@/components/links/ButtonLink';

export type HybridButtonProps = ButtonProps | ButtonLinkProps;

/**
 * A versatile component that can function as a button or a link.
 * It renders a `Button` if no `href` prop is provided, and a `ButtonLink` if `href` is present.
 *
 * @example
 * ```jsx
 * <HybridButton onClick={() => alert('Button Clicked')}>Click Me</HybridButton>
 *
 * <HybridButton href="[https://google.com](https://google.com)">Visit Google</HybridButton>
 * ```
 *
 *
 * @notes
 * - If `href` is not provided, renders a `Button` with the provided props.
 * - If `href` is provided, renders a `ButtonLink` with the provided props.
 * - All props accepted by both `Button` and `ButtonLink` can be used with `HybridIconButton`.
 * - This component prioritizes `Button` functionality. If both `onClick` and `href` are present,
 *   clicking the button will trigger the `onClick` function even if the href is available.
 */
const HybridButton: React.FC<HybridButtonProps> = (props) => {
  const href = (props as ButtonLinkProps).href;

  if (href) {
    return <ButtonLink {...(props as ButtonLinkProps)} href={href} />;
  } else {
    return <Button {...(props as ButtonProps)} />;
  }
};

export default HybridButton;

import React from 'react';

import IconButton, { IconButtonProps } from '@/components/buttons/IconButton';
import IconLink, { IconLinkProps } from '@/components/links/IconLink';

export type HybridIconButtonProps = IconButtonProps | IconLinkProps;

/**
 * @typedef {import('@/components/buttons/IconButtonProps').IconButtonProps & import('@/components/links/IconLinkProps').IconLinkProps} HybridIconButtonProps

 * @component HybridIconButton
 * @description A versatile component that can function as a icon button or an icon link.
 * @prop {HybridIconButtonProps} props

 * @example
 * ```jsx
 * <HybridIconButton onClick={() => alert('Button Clicked')} icon={} />
 *
 * <HybridIconButton href="[https://google.com](https://google.com): [https://google.com](https://google.com)" icon={} />
 * ```

 * @returns {React.ReactNode} A Button or ButtonLink component based on the presence of the `href` prop.

 * @notes
 * - If `href` is not provided, renders a `IconButton` with the provided props.
 * - If `href` is provided, renders a `IconButtonLink` with the provided props.
 * - All props accepted by both `Button` and `ButtonLink` can be used with `HybridIconButton`.
 * - This component prioritizes `Button` functionality. If both `onClick` and `href` are present,
 *   clicking the button will trigger the `onClick` function even if the href is available.

 */
const HybridIconButton: React.FC<HybridIconButtonProps> = (props) => {
  const href = (props as IconLinkProps).href;

  if (href) {
    return <IconLink {...(props as IconLinkProps)} href={href} />;
  } else {
    return <IconButton {...(props as IconButtonProps)} />;
  }
};

export default HybridIconButton;

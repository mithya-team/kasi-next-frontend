import React from 'react';

import TextButton, { TextButtonProps } from '@/components/buttons/TextButton';
import TextLink, { TextLinkProps } from '@/components/links/TextLink';

export type HybridTextButtonProps = TextButtonProps | TextLinkProps;

/**
 * A versatile component that can function as a button or a link.
 * It renders a `TextButton` if no `href` prop is provided, and a `TextButtonLink` if `href` is present.
 *
 * @example
 * ```jsx
 * <HybridTextButton onClick={() => alert('Button Clicked')}>Click Me</HybridTextButton>
 *
 * <HybridTextButton href="[https://google.com](https://google.com)">Visit Google</HybridTextButton>
 * ```
 *
 *
 * @notes
 * - If `href` is not provided, renders a `TextButton` with the provided props.
 * - If `href` is provided, renders a `TextLink` with the provided props.
 * - All props accepted by both `Button` and `ButtonLink` can be used with `HybridTextButton`.
 * - This component prioritizes `Button` functionality. If both `onClick` and `href` are present,
 *   clicking the button will trigger the `onClick` function even if the href is available.
 */
const HybridTextButton: React.FC<HybridTextButtonProps> = (props) => {
  const href = (props as TextLinkProps).href;

  if (href) {
    return <TextLink {...(props as TextLinkProps)} href={href} />;
  } else {
    return <TextButton {...(props as TextButtonProps)} />;
  }
};

export default HybridTextButton;

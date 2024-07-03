import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type NextImageProps = {
  useSkeleton?: boolean;
  classNames?: {
    image?: string;
    blur?: string;
  };
  hasBackdrop?: boolean; // Add background
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { layout: 'fill'; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
const NextImage: React.FC<NextImageProps> = ({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  classNames,
  hasBackdrop,
  ...rest
}) => {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={cn(className, hasBackdrop && 'bg-opacity-75')}
    >
      <Image
        className={cn(
          classNames?.image,
          status === 'loading' && cn('animate-pulse', classNames?.blur)
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        {...rest}
      />
    </figure>
  );
};

export default NextImage;

import {cn} from '@/lib/utils';
import {HTMLAttributes} from 'react';

/* tslint:disable */
/* eslint-disable */
function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };

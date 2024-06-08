import React, {FC, PropsWithChildren, ReactElement} from 'react';

const ScrollContentWrapper: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <section className={'h-full w-full overflow-y-auto overflow-x-hidden'}>
      <div className={'container mx-auto h-full px-4 md:px-8'}>{children}</div>
    </section>
  );
};

export default ScrollContentWrapper;

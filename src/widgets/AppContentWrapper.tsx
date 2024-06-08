import React, {FC, PropsWithChildren, ReactElement} from 'react';

const AppContentWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section
      className={
        'relative flex h-full w-full flex-col items-center justify-start overflow-hidden md:flex-row'
      }
    >
      {children}
    </section>
  );
};

export default AppContentWrapper;

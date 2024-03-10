import React, {FC, PropsWithChildren, ReactElement} from 'react';

const AppContentWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section className={'w-full h-full flex flex-col md:flex-row items-center justify-start relative overflow-hidden'}>
      {children}
    </section>
  );
};

export default AppContentWrapper;

import React, {FC, PropsWithChildren, ReactElement} from 'react';
// import AppNavMenu from '@/components/AppNavMenu';

const AppContentWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section className={'w-full h-full flex flex-col md:flex-row items-center justify-start relative overflow-hidden'}>
      {/*<AppNavMenu className={'flex w-full md:w-20 items-center flex-col justify-center order-last md:order-first border-t-[1px] md:border-none'}/>*/}

      {children}
    </section>
  );
};

export default AppContentWrapper;

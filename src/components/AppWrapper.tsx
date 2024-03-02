import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/components/AppHeader';
import {Toaster} from '@/components/ui/toaster';

const AppWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <div className={'app-wrapper w-full h-full overflow-hidden bg-gradient-to-b from-background to-secondary'}>
      <div className={'app-content w-full h-full flex flex-col items-start justify-start'}>
        <AppHeader/>

        {children}

        <Toaster/>
      </div>
    </div>
  );
};

export default AppWrapper;

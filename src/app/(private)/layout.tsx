import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/widgets/Header/AppHeader';

const Layout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <div className={'w-full h-full flex flex-col items-start justify-start overflow-hidden'}>
      <AppHeader variant={'private'}/>

      {children}
    </div>
  );
};

export default Layout;

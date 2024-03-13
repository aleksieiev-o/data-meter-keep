import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/widgets/Header/AppHeader';
import {isUserAuthenticated} from '@/lib/firebase/firebase-admin';
import {redirect} from 'next/navigation';
import {RoutePath} from '@/shared/router/Routes.enum';

const Layout: FC<PropsWithChildren> = async ({children}): Promise<ReactElement> => {
  if (await isUserAuthenticated()) {
    redirect(RoutePath.CATEGORY_LIST);
  }

  return (
    <div className={'w-full h-full flex flex-col items-start justify-start overflow-hidden'}>
      <AppHeader variant={'auth'}/>

      {children}
    </div>
  );
};

export default Layout;

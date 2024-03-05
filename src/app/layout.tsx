import '@/assets/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {createAppMetaData} from '@/shared/createAppMetaData';
import AppProvider from '@/shared/providers/App.provider';
import {APP_DESCRIPTION} from '@/shared/appConstants';
import {Toaster} from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = createAppMetaData({
  title: '',
  description: APP_DESCRIPTION,
});

const RootLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <html lang={'en'} className={'w-full h-full'}>
      <body className={`${inter.className} w-full h-full`}>
        <AppProvider>
          <div className={'w-full h-full overflow-hidden bg-background  '}>
            {children}
            <Toaster/>
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

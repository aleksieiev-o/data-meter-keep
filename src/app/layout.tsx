import '@/assets/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {FC, PropsWithChildren, ReactElement} from 'react';
import {createAppMetaData} from '@/shared/createAppMetaData';
import AppProvider from '@/shared/providers/App.provider';
import AppWrapper from '@/widgets/AppWrapper';
import {APP_DESCRIPTION} from '@/shared/appConstants';

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
      <AppWrapper>
        {children}
      </AppWrapper>
    </AppProvider>
    </body>
    </html>
  );
};

export default RootLayout;

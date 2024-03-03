'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';
import AppThemeProvider from '@/components/providers/AppTheme.provider';
import AppAuthProvider from '@/components/providers/AppAuth.provider';

const AppProviders: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <AppThemeProvider
      attribute={'class'}
      defaultTheme={AppThemeEnum.SYSTEM}
      storageKey={'dmk-app-theme'}
      disableTransitionOnChange
      enableSystem>
      <AppAuthProvider>
        {children}
      </AppAuthProvider>
    </AppThemeProvider>
  );
};

export default AppProviders;

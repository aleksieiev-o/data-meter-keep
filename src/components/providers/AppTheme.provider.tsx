'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {ThemeProvider} from 'next-themes';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';

const AppThemeProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme={AppThemeEnum.SYSTEM}
      storageKey={'dmk-app-theme'}
      disableTransitionOnChange
      enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

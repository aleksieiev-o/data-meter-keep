'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppThemeProvider from '@/components/providers/AppTheme.provider';

const AppProviders: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <AppThemeProvider>
      {children}
    </AppThemeProvider>
  );
};

export default AppProviders;

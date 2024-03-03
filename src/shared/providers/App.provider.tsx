'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppThemeProvider from '@/features/theme/AppTheme.provider';

const AppProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <AppThemeProvider>
      {children}
    </AppThemeProvider>
  );
};

export default AppProvider;

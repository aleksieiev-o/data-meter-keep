'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppThemeProvider from '@/features/theme/AppTheme.provider';
import {ComposeChildren} from '@/lib/react';

const AppProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <ComposeChildren>
      <AppThemeProvider/>
      {children}
    </ComposeChildren>
  );
};

export default AppProvider;

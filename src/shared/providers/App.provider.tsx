'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppThemeProvider from '@/features/theme/AppTheme.provider';
import {ComposeChildren} from '@/lib/react';
import AppReactQueryProvider from '@/shared/providers/AppReactQuery.provider';

const AppProvider: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <ComposeChildren>
      <AppReactQueryProvider/>
      <AppThemeProvider/>
      {children}
    </ComposeChildren>
  );
};

export default AppProvider;

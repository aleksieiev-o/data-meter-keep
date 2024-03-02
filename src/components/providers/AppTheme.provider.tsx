'use client';

import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {ThemeProviderProps} from 'next-themes/dist/types';
import {ThemeProvider} from 'next-themes';

const AppThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = (props): ReactElement => {
  const {children} = props;

  return (
    <ThemeProvider {...props}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;

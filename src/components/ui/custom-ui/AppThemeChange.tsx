'use client';

import React, {FC, ReactElement} from 'react';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-react';
import {DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';

const AppThemeChange: FC = (): ReactElement => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size="icon" className="shadow-md" title={'Theme mode menu'}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(AppThemeEnum.SYSTEM)}>
          System
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme(AppThemeEnum.LIGHT)}>
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme(AppThemeEnum.DARK)}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppThemeChange;

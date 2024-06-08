'use client';

import React, {FC, ReactElement} from 'react';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';
import {Moon, Sun, SunMoon} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';
import DropdownMenuItemContent from '@/shared/ui/DropdownMenuItemContent';

const ThemeChangeButton: FC = (): ReactElement => {
  const {setTheme} = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size="icon" title={'Theme mode menu'}>
          <Sun className="h-[1.7rem] w-[1.7rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

          <Moon className="absolute h-[1.7rem] w-[1.7rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Application theme mode</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => setTheme(AppThemeEnum.SYSTEM)}
          title="System"
        >
          <DropdownMenuItemContent Icon={SunMoon} title="System" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme(AppThemeEnum.LIGHT)}
          title="Light"
        >
          <DropdownMenuItemContent Icon={Sun} title="Light" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme(AppThemeEnum.DARK)}
          title="Dark"
        >
          <DropdownMenuItemContent Icon={Moon} title="Dark" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeChangeButton;

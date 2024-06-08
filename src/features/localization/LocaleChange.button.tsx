'use client';

import React, {FC, ReactElement, useState} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {Languages} from 'lucide-react';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {AppLocaleEnum, AppLocaleNameEnum} from '@/shared/types/appLocale.enum';

const LocaleChangeButton: FC = (): ReactElement => {
  const [locale, setLocale] = useState<AppLocaleEnum>(AppLocaleEnum.EN_US);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size="icon" title={'Change locale menu'}>
          <Languages className="h-[1.7rem] w-[1.7rem] rotate-0 scale-100 transition-all" />

          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Application language</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => setLocale(AppLocaleEnum.EN_US)}>
          {AppLocaleNameEnum.EN_US}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setLocale(AppLocaleEnum.DE_DE)}>
          {AppLocaleNameEnum.DE_DE}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setLocale(AppLocaleEnum.RU_RU)}>
          {AppLocaleNameEnum.RU_RU}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleChangeButton;

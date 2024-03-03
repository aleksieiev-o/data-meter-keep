import { RoutePath } from '@/shared/router/Routes.enum';
import Link from 'next/link';
import React, {FC, ReactElement} from 'react';
import ThemeChangeButton from '@/features/theme/ThemeChange.button';
import {BarChartHorizontal} from 'lucide-react';
import AuthStateChangeButton from '@/widgets/header/_ui/AuthStateChange.button';

const AppHeader: FC = (): ReactElement => {
  return (
    <header className={'w-full h-20 flex flex-row items-center justify-between overflow-hidden border-b shadow-md pl-2 md:pl-4 pr-4 md:pr-8'}>
      <div className={'h-full'}>
        <Link href={RoutePath.NOTE_LIST} className={'w-full h-full mr-4 flex items-center justify-center'}>
          <BarChartHorizontal className={'w-[48px] h-[48px] stroke-primary'}/>
        </Link>
      </div>

      <div className={'h-20 grid grid-flow-col auto-cols-max gap-4 md:gap-8 items-center'}>
        <ThemeChangeButton/>

        {/* TODO add localization */}
        {/*<LocaleChangeButton/>*/}

        <AuthStateChangeButton/>

        {/*<AppNavMenuMobile/>*/}
      </div>
    </header>
  );
};

export default AppHeader;

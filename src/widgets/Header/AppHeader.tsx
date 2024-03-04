import { RoutePath } from '@/shared/router/Routes.enum';
import Link from 'next/link';
import React, {FC, ReactElement} from 'react';
import ThemeChangeButton from '@/features/theme/ThemeChange.button';
import {BarChartHorizontal} from 'lucide-react';
import AuthStateChangeButton from '@/widgets/Header/_ui/AuthStateChange.button';
import AppHeaderInfo from '@/widgets/Header/AppHeaderInfo';
import {APP_NAME} from '@/shared/appConstants';

interface Props {
  variant: 'auth' | 'private' | 'public';
}

const AppHeader: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <header className={'w-full h-20 flex flex-row items-center justify-between overflow-hidden border-b shadow-md pl-2 md:pl-4 pr-4 md:pr-8'}>
      <Link href={RoutePath.NOTE_LIST}>
        <div className={'flex flex-row items-end gap-2 overflow-hidden'} title={APP_NAME}>
          <BarChartHorizontal className={'w-12 h-12 stroke-primary'}/>

          <strong className={'text-primary font-bold leading-5 whitespace-nowrap md:block hidden'}>
            {APP_NAME}
          </strong>
        </div>
      </Link>

      <div className={'h-20 grid grid-flow-col auto-cols-max gap-4 md:gap-6 items-center'}>
        {variant !== 'auth' && <AppHeaderInfo/>}
        <AuthStateChangeButton/>
        {/*<LocaleChangeButton/>*/}
        <ThemeChangeButton/>
        {/*<AppNavMenuMobile/>*/}
      </div>
    </header>
  );
};

export default AppHeader;

import React, {FC, ReactElement} from 'react';
import ThemeChangeButton from '@/features/theme/ThemeChange.button';
import AuthStateChangeButton from '@/widgets/Header/_ui/AuthStateChange.button';
import AppHeaderInfo from '@/widgets/Header/AppHeaderInfo';
import HeaderLogo from '@/widgets/Header/_ui/HeaderLogo';
import HeaderNav from '@/widgets/Header/_ui/HeaderNav';
import HeaderDrawer from '@/widgets/Header/_ui/HeaderDrawer';

interface Props {
  variant: 'auth' | 'private' | 'public';
}

const AppHeader: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <header className={'w-full h-20 flex flex-row items-center justify-between gap-4 lg:gap-6 overflow-hidden border-b shadow-md px-2 md:px-4'}>
      {variant !== 'auth' && <HeaderDrawer/>}

      <div className={'h-full flex md:hidden items-center'}>
        {variant === 'auth' && <HeaderLogo appNameVisibilityClasses={''} withSheetClose={false}/>}
      </div>

      <div className={'w-full h-full hidden md:flex items-center justify-start gap-4 lg:gap-6'}>
        <HeaderLogo appNameVisibilityClasses={'hidden lg:block'} withSheetClose={false}/>

        {variant !== 'auth' &&
          <div className={'flex-row items-center justify-center gap-4 lg:gap-6 mx-auto'}>
            <HeaderNav withSheetClose={false}/>
          </div>
        }
      </div>

      <div className={'h-20 grid grid-flow-col auto-cols-max gap-4 lg:gap-6 items-center'}>
        {variant !== 'auth' && <AppHeaderInfo/>}

        {variant !== 'auth' && <AuthStateChangeButton/>}

        {/*<LocaleChangeButton/>*/}

        <ThemeChangeButton/>
      </div>
    </header>
  );
};

export default AppHeader;

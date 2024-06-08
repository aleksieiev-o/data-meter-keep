import React, {FC, ReactElement} from 'react';
import HeaderDrawer from '@/widgets/Header/_ui/HeaderDrawer';
import HeaderLogo from '@/widgets/Header/_ui/HeaderLogo';
import HeaderNav from '@/widgets/Header/_ui/HeaderNav';
import AppHeaderInfo from '@/widgets/Header/AppHeaderInfo';
import AuthStateChangeButton from '@/widgets/Header/_ui/AuthStateChange.button';
import ThemeChangeButton from '@/features/theme/ThemeChange.button';

interface Props {
  variant: 'auth' | 'private' | 'public';
}

const AppHeader: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <header
      className={
        'flex h-20 w-full flex-row items-center justify-between gap-4 overflow-hidden border-b px-2 shadow-md md:px-4 lg:gap-6'
      }
    >
      {variant !== 'auth' && <HeaderDrawer />}

      {variant === 'auth' && (
        <div className={'flex h-full items-center md:hidden'}>
          <HeaderLogo appNameVisibilityClasses={''} withSheetClose={false} />
        </div>
      )}

      <div
        className={
          'hidden h-full w-full items-center justify-start gap-4 md:flex lg:gap-6'
        }
      >
        <HeaderLogo
          appNameVisibilityClasses={'hidden lg:block'}
          withSheetClose={false}
        />

        {variant !== 'auth' && (
          <div
            className={
              'mx-auto flex flex-row items-center justify-center gap-4 lg:gap-6'
            }
          >
            <HeaderNav withSheetClose={false} />
          </div>
        )}
      </div>

      <div
        className={
          'grid h-20 auto-cols-max grid-flow-col items-center gap-4 lg:gap-6'
        }
      >
        {variant !== 'auth' && (
          <>
            <AppHeaderInfo />

            <AuthStateChangeButton />
          </>
        )}

        {/*<LocaleChangeButton/>*/}

        <ThemeChangeButton />
      </div>
    </header>
  );
};

export default AppHeader;

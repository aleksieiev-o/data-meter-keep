import {Metadata} from 'next';
import {createAppMetaData} from '@/utils/createAppMetaData';
import {FC, PropsWithChildren, ReactElement} from 'react';
import AppContentWrapper from '@/components/AppContentWrapper';
import {RouteName} from '@/router/Routes.enum';
import {APP_DESCRIPTION} from '@/utils/appConstants';

export const metadata: Metadata = createAppMetaData({
  title: RouteName.SIGN_IN,
  description: APP_DESCRIPTION,
});

const SignInLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section className={'w-full h-full overflow-hidden'}>
      <AppContentWrapper>
        {children}
      </AppContentWrapper>
    </section>
  );
};

export default SignInLayout;

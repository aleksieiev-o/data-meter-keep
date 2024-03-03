import {Metadata} from 'next';
import {createAppMetaData} from '@/shared/createAppMetaData';
import {FC, PropsWithChildren, ReactElement} from 'react';
import AppContentWrapper from '@/widgets/AppContentWrapper';
import {RouteName} from '@/shared/router/Routes.enum';
import {APP_DESCRIPTION} from '@/shared/appConstants';

export const metadata: Metadata = createAppMetaData({
  title: RouteName.CATEGORY_LIST,
  description: APP_DESCRIPTION,
});

const CategoriesLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section className={'w-full h-full overflow-hidden'}>
      <AppContentWrapper>
        {children}
      </AppContentWrapper>
    </section>
  );
};

export default CategoriesLayout;

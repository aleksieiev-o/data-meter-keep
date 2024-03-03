import {Metadata} from 'next';
import {createAppMetaData} from '@/shared/createAppMetaData';
import {FC, PropsWithChildren, ReactElement} from 'react';
import AppContentWrapper from '@/widgets/AppContentWrapper';
import {RouteName} from '@/shared/router/Routes.enum';
import {APP_DESCRIPTION} from '@/shared/appConstants';

export const metadata: Metadata = createAppMetaData({
  title: RouteName.UPDATE_NOTE,
  description: APP_DESCRIPTION,
});

const UpdateNoteLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <section className={'w-full h-full overflow-hidden'}>
      <AppContentWrapper>
        {children}
      </AppContentWrapper>
    </section>
  );
};

export default UpdateNoteLayout;

import React, {FC, ReactElement} from 'react';
import GoHomeButton from '@/shared/ui/GoHome.button';

const NotFoundPage: FC = (): ReactElement => {
  return (
    <section className={'w-full h-full grid grid-cols-1 content-center justify-items-center overflow-hidden'}>
      <div className={'h-full grid grid-cols-1 gap-6 content-start'}>
        <p className={'text-md text-center'}>Page not found</p>

        <GoHomeButton/>
      </div>
    </section>
  );
};

export default NotFoundPage;

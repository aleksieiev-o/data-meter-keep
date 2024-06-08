import React, {FC, ReactElement} from 'react';
import GoHomeButton from '@/shared/ui/appButton/GoHome.button';

const NotFoundPage: FC = (): ReactElement => {
  return (
    <section
      className={
        'grid h-full w-full grid-cols-1 content-center justify-items-center overflow-hidden'
      }
    >
      <div className={'grid h-full grid-cols-1 content-start gap-6'}>
        <p className={'text-md text-center'}>Page not found</p>

        <GoHomeButton />
      </div>
    </section>
  );
};

export default NotFoundPage;

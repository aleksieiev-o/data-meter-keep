'use client';

import React, {FC, ReactElement} from 'react';
import ForceReloadPageButton from '@/shared/ui/appButton/ForceReloadPage.button';

const GlobalErrorPage: FC = (): ReactElement => {
  return (
    <html>
      <body>
        <section
          className={
            'grid h-full w-full grid-cols-1 content-center justify-items-center overflow-hidden'
          }
        >
          <div className={'grid h-full grid-cols-1 content-start gap-6'}>
            <p className={'text-md text-center'}>Something went wrong!</p>

            <ForceReloadPageButton />
          </div>
        </section>
      </body>
    </html>
  );
};

export default GlobalErrorPage;

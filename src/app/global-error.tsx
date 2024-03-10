'use client';

import React, {FC, ReactElement} from 'react';
import ForceReloadPageButton from '@/shared/ui/ForceReloadPage.button';

const GlobalErrorPage: FC = (): ReactElement => {
  return (
    <html>
      <body>
        <section className={'w-full h-full grid grid-cols-1 content-center justify-items-center overflow-hidden'}>
          <div className={'h-full grid grid-cols-1 gap-6 content-start'}>
            <p className={'text-md text-center'}>
              Something went wrong!
            </p>

            <ForceReloadPageButton/>
          </div>
        </section>
      </body>
    </html>
  );
};

export default GlobalErrorPage;

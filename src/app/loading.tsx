import React, {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {Loader2} from 'lucide-react';

const Loading: FC = (): ReactElement => {
  return (
    <section
      className={
        'grid h-full w-full grid-cols-1 content-center overflow-hidden'
      }
    >
      <ScrollContentWrapper>
        <div
          className={
            'flex h-full w-full flex-col items-center justify-center gap-2'
          }
        >
          <Loader2 className={'h-10 w-10 animate-spin'} />

          <span>Loading...</span>
        </div>
      </ScrollContentWrapper>
    </section>
  );
};

export default Loading;

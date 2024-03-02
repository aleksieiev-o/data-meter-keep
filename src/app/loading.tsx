import React, {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/components/ui/custom-ui/ScrollContentWrapper';
import {Loader2} from 'lucide-react';

const Loading: FC = (): ReactElement => {
  return (
    <section className={'w-full h-full grid grid-cols-1 content-center overflow-hidden'}>
      <ScrollContentWrapper>
        <div className={'w-full h-full flex flex-col items-center justify-items-center gap-2'}>
          <Loader2 className={'h-10 w-10 animate-spin'}/>

          <span>Loading...</span>
        </div>
      </ScrollContentWrapper>
    </section>
  );
};

export default Loading;

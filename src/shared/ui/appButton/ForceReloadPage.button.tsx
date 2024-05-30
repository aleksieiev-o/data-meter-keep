'use client';

import React, {FC, ReactElement} from 'react';
import {RefreshCw} from 'lucide-react';
import {Button} from '@/components/ui/button';

const ForceReloadPageButton: FC = (): ReactElement => {
  const forceReloadPage = () => {
    location.reload();
  };

  return (
    <Button
      onClick={() => forceReloadPage()}
      variant={'default'}
      className={'shadow-md'}
      title={'Reload page'}>
      <RefreshCw className={'w-5 h-5 mr-4'}/>

      Reload page
    </Button>
  );
};

export default ForceReloadPageButton;

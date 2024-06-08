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
      title={'Reload page'}
    >
      <RefreshCw className={'mr-4 h-5 w-5'} />
      Reload page
    </Button>
  );
};

export default ForceReloadPageButton;

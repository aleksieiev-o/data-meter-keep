'use client';

import React, {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {RoutePath} from '@/router/Routes.enum';
import {useRouter} from 'next/navigation';
import {Home} from 'lucide-react';

const GoHomeButton: FC = (): ReactElement => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.replace(RoutePath.NOTE_LIST)}
      variant={'default'}
      className={'shadow-md'}
      title={'Go to main page'}>
      <Home className={'w-4 h-4 mr-4'}/>

      Go to main page
    </Button>
  );
};

export default GoHomeButton;

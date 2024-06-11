'use client';

import React, {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {RoutePath} from '@/shared/router/Routes.enum';
import {useRouter} from 'next/navigation';
import {Home} from 'lucide-react';

const GoHomeButton: FC = (): ReactElement => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.replace(RoutePath.HOME)}
      variant={'default'}
      className={'shadow-md'}
      title={'Go home'}
    >
      <Home className={'mr-4 h-5 w-5'} />

      <p>Go home</p>
    </Button>
  );
};

export default GoHomeButton;

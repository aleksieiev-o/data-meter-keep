'use client';

import React, {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {RoutePath} from '@/shared/router/Routes.enum';
import {useRouter} from 'next/navigation';
import {Home} from 'lucide-react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';

const GoHomeButton: FC = (): ReactElement => {
  const router = useRouter();
  const [user] = useAuthState(firebaseAuth);

  return (
    <Button
      onClick={() => router.replace(RoutePath.HOME)}
      variant={'default'}
      className={'shadow-md'}
      title={'Go home'}>
      <Home className={'w-5 h-5 mr-4'}/>

      <p>
        Go home
      </p>
    </Button>
  );
};

export default GoHomeButton;

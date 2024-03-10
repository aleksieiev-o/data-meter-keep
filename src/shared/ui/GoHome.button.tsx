'use client';

import React, {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {RoutePath} from '@/shared/router/Routes.enum';
import {useRouter} from 'next/navigation';
import {Home} from 'lucide-react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase';

const GoHomeButton: FC = (): ReactElement => {
  const router = useRouter();
  const [user] = useAuthState(firebaseAuth);

  return (
    <Button
      onClick={() => router.replace(user ? RoutePath.CATEGORY_LIST : RoutePath.SIGN_IN)}
      variant={'default'}
      className={'shadow-md'}
      title={'Go home'}>
      <Home className={'w-4 h-4 mr-4'}/>

      Go home
    </Button>
  );
};

export default GoHomeButton;

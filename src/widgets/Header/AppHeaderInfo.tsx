'use client';

import {FC, ReactElement} from 'react';
import UserAvatar from '@/widgets/Header/_ui/UserAvatar';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';

const AppHeaderInfo: FC = (): ReactElement => {
  const [user] = useAuthState(firebaseAuth);

  return (
    <>
      {
        user && <Button variant={'ghost'} className={'px-0'} title={`${user?.displayName || 'User'}\n${user?.email}`}>
          <div className={'flex flex-row gap-4 items-center justify-start overflow-hidden'}>
            {
              user ?
                <div className={'flex flex-col items-start justify-start overflow-hidden sm:flex hidden'}>
                  <span
                    className={'w-full text-right whitespace-nowrap text-ellipsis overflow-hidden'}>
                    {user?.displayName || 'User'}
                  </span>
    
                  <span
                    className={'w-full text-right whitespace-nowrap text-ellipsis overflow-hidden'}>
                    {user?.email}
                  </span>
                </div>
                :
                <div className={'flex flex-col gap-2 items-start justify-start overflow-hidden sm:flex hidden'}>
                  <Skeleton className={'w-[150px] h-4'}/>
                  <Skeleton className={'w-[150px] h-4'}/>
                </div>
            }
    
            <UserAvatar/>
          </div>
        </Button>
      }
    </>
  );
};

export default AppHeaderInfo;

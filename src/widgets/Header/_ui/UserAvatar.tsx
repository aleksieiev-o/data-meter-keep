'use client';

import {FC, ReactElement} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useInitials} from '@/widgets/Header/_hooks/useInitials';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase';
import {Skeleton} from '@/components/ui/skeleton';

const UserAvatar: FC = (): ReactElement => {
  const [user] = useAuthState(firebaseAuth);
  const userInitials = useInitials(user?.displayName || '');

  return (
    <>
      {
        user ?
          <Avatar className={'h-12 w-12'}>
            <AvatarImage src={user?.photoURL || ''}/>

            <AvatarFallback className={'text-primary-foreground text-xl font-bold'} aria-hidden={true}>
              {userInitials}
            </AvatarFallback>
          </Avatar>
          :
          <Skeleton className={'h-12 w-12 rounded-full'}/>
      }
    </>
  );
};

export default UserAvatar;

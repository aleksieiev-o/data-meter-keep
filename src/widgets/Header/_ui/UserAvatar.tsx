'use client';

import {FC, ReactElement, useContext} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useInitials} from '@/widgets/Header/_hooks/useInitials';
import {Skeleton} from '@/components/ui/skeleton';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {DEFAULT_USER_DN} from '@/shared/appConstants';

const UserAvatar: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const userInitials = useInitials(user?.displayName || DEFAULT_USER_DN);

  return (
    <>
      {user ? (
        <Avatar className={'h-12 w-12'}>
          <AvatarImage src={user?.photoURL || ''} />

          <AvatarFallback
            className={'text-xl font-bold text-primary-foreground'}
            aria-hidden={true}
          >
            {userInitials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Skeleton className={'h-12 w-12 rounded-full'} />
      )}
    </>
  );
};

export default UserAvatar;

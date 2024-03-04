'use client';

import React, {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {RoutePath} from '@/shared/router/Routes.enum';
import {LogIn, LogOut} from 'lucide-react';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase';
import {Skeleton} from '@/components/ui/skeleton';

const AuthStateChangeButton: FC = (): ReactElement => {
  const [user] = useAuthState(firebaseAuth);
  const [signOut, signOutLoading] = useSignOut(firebaseAuth);

  return (
    <>
      {user ?
        <Button
          onClick={() => signOut()}
          disabled={signOutLoading}
          variant={'ghost'}
          size="icon"
          title={'Sign out'}>
          <LogOut className={'h-[1.7rem] w-[1.7rem]'}/>
        </Button>
        :
        <DropdownMenu>
          {
            user ?
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  size="icon"
                  title={'Authorization pages menu'}>
                  <LogIn className={'h-[1.7rem] w-[1.7rem]'}/>
                </Button>
              </DropdownMenuTrigger>
              :
              <Skeleton className={'h-12 w-12'}/>
          }

          <DropdownMenuContent align="end">
            <Link href={RoutePath.SIGN_IN}>
              <DropdownMenuItem title={'Sign in'}>
                Sing in
              </DropdownMenuItem>
            </Link>

            <Link href={RoutePath.SIGN_UP}>
              <DropdownMenuItem title={'Sign up'}>
                Sing up
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </>
  );
};

export default AuthStateChangeButton;

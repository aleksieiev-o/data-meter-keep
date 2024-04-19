'use client';

import React, {FC, ReactElement, useState} from 'react';
import {Button} from '@/components/ui/button';
import {DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {RoutePath} from '@/shared/router/Routes.enum';
import {LogIn, LogOut} from 'lucide-react';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {Skeleton} from '@/components/ui/skeleton';
import SignOutConfirmDialog from '@/features/authentication/SignOutConfirm.dialog';

const AuthStateChangeButton: FC = (): ReactElement => {
  const [user, loading] = useAuthState(firebaseAuth);
  const [, signOutLoading] = useSignOut(firebaseAuth);
  const [dialogIsOpenSignOut, setDialogIsOpenSignOut] = useState<boolean>(false);

  return (
    <>
      {user ?
        <>
          {
            loading ?
              <Skeleton className={'h-12 w-12'}/>
              :
              <Button
                onClick={() => setDialogIsOpenSignOut(true)}
                disabled={signOutLoading}
                variant={'ghost'}
                size="icon"
                title={'Sign out'}>
                <LogOut className={'h-[1.7rem] w-[1.7rem]'}/>
              </Button>
          }
        </>
        :
        <DropdownMenu>
          {
            loading ?
              <Skeleton className={'h-12 w-12'}/>
              :
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  size="icon"
                  title={'Open menu'}>
                  <LogIn className={'h-[1.7rem] w-[1.7rem]'}/>
                </Button>
              </DropdownMenuTrigger>
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

      <SignOutConfirmDialog
        setDialogIsOpen={setDialogIsOpenSignOut}
        dialogIsOpen={dialogIsOpenSignOut}/>
    </>
  );
};

export default AuthStateChangeButton;

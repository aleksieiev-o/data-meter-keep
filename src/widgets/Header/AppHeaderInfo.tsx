'use client';

import {FC, ReactElement, useState} from 'react';
import UserAvatar from '@/widgets/Header/_ui/UserAvatar';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {Skeleton} from '@/components/ui/skeleton';
import {Button} from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {LogOut, UserRoundCog} from 'lucide-react';
import SignOutConfirmDialog from '@/features/authentication/SignOutConfirm.dialog';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {useRouter} from 'next/navigation';
import DropdownMenuItemContent from '@/shared/ui/DropdownMenuItemContent';
import {DEFAULT_USER_DN} from '@/shared/appConstants';

const AppHeaderInfo: FC = (): ReactElement => {
  const {push} = useRouter();
  const [user, loading] = useAuthState(firebaseAuth);
  const [, signOutLoading] = useSignOut(firebaseAuth);
  const [dialogIsOpenSignOut, setDialogIsOpenSignOut] =
    useState<boolean>(false);

  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              className={'px-0'}
              title="Open user actions"
            >
              <div
                className={
                  'flex flex-row items-center justify-start gap-4 overflow-hidden'
                }
              >
                {user ? (
                  <div
                    className={
                      'hidden flex-col items-start justify-start overflow-hidden sm:flex'
                    }
                  >
                    <span
                      className={
                        'w-full overflow-hidden text-ellipsis whitespace-nowrap text-right'
                      }
                    >
                      {user?.displayName || DEFAULT_USER_DN}
                    </span>

                    <span
                      className={
                        'w-full overflow-hidden text-ellipsis whitespace-nowrap text-right'
                      }
                    >
                      {user?.email}
                    </span>
                  </div>
                ) : (
                  <div
                    className={
                      'hidden flex-col items-start justify-start gap-2 overflow-hidden sm:flex'
                    }
                  >
                    <Skeleton className={'h-4 w-[150px]'} />
                    <Skeleton className={'h-4 w-[150px]'} />
                  </div>
                )}

                <UserAvatar />
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>User actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => push(RoutePath.USER_SETTINGS)}
              title={RouteName.USER_SETTINGS}
            >
              <DropdownMenuItemContent
                Icon={UserRoundCog}
                title={RouteName.USER_SETTINGS}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setDialogIsOpenSignOut(true)}
              disabled={signOutLoading || loading}
              title="Sign out"
            >
              <DropdownMenuItemContent Icon={LogOut} title="Sign out" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <SignOutConfirmDialog
        setDialogIsOpen={setDialogIsOpenSignOut}
        dialogIsOpen={dialogIsOpenSignOut}
      />
    </>
  );
};

export default AppHeaderInfo;

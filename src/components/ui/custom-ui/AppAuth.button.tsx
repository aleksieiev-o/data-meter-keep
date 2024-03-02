'use client';

import React, {FC, ReactElement} from 'react';
import {DropdownMenu, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {Button} from '@/components/ui/button';
import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {RoutePath} from '@/router/Routes.enum';
import {LogIn, LogOut} from 'lucide-react';

const AppAuthButton: FC = (): ReactElement => {
  const isAuth = true;

  return (
    <>
      {isAuth ?
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'default'} size="icon" className="shadow-md" title={'Authorization pages menu'}>
              <LogIn className={'h-[1.2rem] w-[1.2rem]'}/>
            </Button>
          </DropdownMenuTrigger>

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
      :
        <Button variant={'default'} size="icon" className="shadow-md" title={'Sign out'}>
          <LogOut className={'h-[1.2rem] w-[1.2rem]'}/>
        </Button>
      }
    </>
  );
};

export default AppAuthButton;

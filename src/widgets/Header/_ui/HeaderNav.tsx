'use client';

import React, {FC, ReactElement} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {SheetClose} from '@/components/ui/sheet';
import {router} from '@/shared/router/Router';
import {usePathname} from 'next/navigation';

interface Props {
  withSheetClose: boolean;
}

const HeaderNav: FC<Props> = (props): ReactElement => {
  const {withSheetClose} = props;
  const pathname = usePathname();
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose ? [SheetClose, {asChild: true}] : [React.Fragment, {}];

  return (
    <>
      {
        router.map((item) => (
          <SheetCloseWrapper {...sheetCloseWrapperProps} key={item.href}>
            <Link href={item.href}>
              <Button variant={pathname === item.href ? 'outline' : 'ghost'} title={item.name}>
                {item.name}
              </Button>
            </Link>
          </SheetCloseWrapper>
        ))
      }
    </>
  );
};

export default HeaderNav;

'use client';

import React, {FC, ReactElement} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {SheetClose} from '@/components/ui/sheet';
import {router} from '@/shared/router/Router';

interface Props {
  withSheetClose: boolean;
}

const HeaderNav: FC<Props> = (props): ReactElement => {
  const {withSheetClose} = props;
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose ? [SheetClose, {asChild: true}] : [React.Fragment, {}];

  return (
    <>
      {
        router.map((item) => (
          <SheetCloseWrapper {...sheetCloseWrapperProps} key={item.href}>
            <Link href={item.href}>
              <Button variant={'ghost'} title={'Categories list'}>
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

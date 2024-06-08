import React, {FC, ReactElement} from 'react';
import {RoutePath} from '@/shared/router/Routes.enum';
import {APP_NAME} from '@/shared/appConstants';
import {BarChartHorizontal} from 'lucide-react';
import Link from 'next/link';
import {SheetClose} from '@/components/ui/sheet';

interface Props {
  appNameVisibilityClasses: string;
  withSheetClose: boolean;
}

const HeaderLogo: FC<Props> = (props): ReactElement => {
  const {appNameVisibilityClasses, withSheetClose} = props;
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, {asChild: true}]
    : [React.Fragment, {}];

  return (
    <SheetCloseWrapper {...sheetCloseWrapperProps}>
      <Link href={RoutePath.HOME}>
        <div
          className={'flex flex-row items-end gap-2 overflow-hidden'}
          title={APP_NAME}
        >
          <BarChartHorizontal className={'h-12 w-12 stroke-primary'} />

          <strong
            className={`${appNameVisibilityClasses} whitespace-nowrap font-bold leading-5 text-primary`}
          >
            {APP_NAME}
          </strong>
        </div>
      </Link>
    </SheetCloseWrapper>
  );
};

export default HeaderLogo;

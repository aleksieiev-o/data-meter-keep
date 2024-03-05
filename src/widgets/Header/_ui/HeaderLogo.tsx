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
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose ? [SheetClose, {asChild: true}] : [React.Fragment, {}];

  return (
    <SheetCloseWrapper {...sheetCloseWrapperProps}>
      <Link href={RoutePath.NOTE_LIST}>
        <div className={'flex flex-row items-end gap-2 overflow-hidden'} title={APP_NAME}>
          <BarChartHorizontal className={'w-12 h-12 stroke-primary'}/>

          <strong className={`${appNameVisibilityClasses} text-primary font-bold leading-5 whitespace-nowrap`}>
            {APP_NAME}
          </strong>
        </div>
      </Link>
    </SheetCloseWrapper>
  );
};

export default HeaderLogo;

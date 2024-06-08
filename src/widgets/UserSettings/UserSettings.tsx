'use client';

import {firebaseAuth} from '@/lib/firebase/firebase';
import {RouteName} from '@/shared/router/Routes.enum';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {FC, ReactElement, useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import UserSettingsTextItem from './UserSettingsTextItem';
import {User, Mail, LockKeyhole} from 'lucide-react';
import ChangeDisplayNameDialog from '@/features/user-actions/ChangeDisplayName.dialog';
import {DEFAULT_USER_DN} from '@/shared/appConstants';
import ChangeEmailDialog from '@/features/user-actions/ChangeEmail.dialog';
import ChangePasswordDialog from '@/features/user-actions/ChangePassword.dialog';

const UserSettings: FC = (): ReactElement => {
  const [user] = useAuthState(firebaseAuth);
  const [dialogIsOpenChangeDisplayName, setDialogIsOpenChangeDisplayName] =
    useState<boolean>(false);
  const [dialogIsOpenChangeEmail, setDialogIsOpenChangeEmail] =
    useState<boolean>(false);
  const [dialogIsOpenChangePassword, setDialogIsOpenChangePassword] =
    useState<boolean>(false);

  return (
    <div className={'flex h-full w-full flex-col gap-6 py-6'}>
      <PageTitle title={RouteName.USER_SETTINGS} />

      <div>
        <GoToPreviousPageButton />
      </div>

      <div className="flex w-full flex-col items-start justify-start gap-6">
        <UserSettingsTextItem
          handleClick={() => setDialogIsOpenChangeDisplayName(true)}
          title="Display name"
          itemData={user?.displayName || DEFAULT_USER_DN}
          buttonTitle="Change display name"
          ButtonIcon={User}
        />

        <UserSettingsTextItem
          handleClick={() => setDialogIsOpenChangeEmail(true)}
          title="Email"
          itemData={user?.email || 'email@com'}
          buttonTitle="Change email"
          ButtonIcon={Mail}
        />

        <UserSettingsTextItem
          handleClick={() => setDialogIsOpenChangePassword(true)}
          title="Password"
          itemData={'******'}
          buttonTitle="Change password"
          ButtonIcon={LockKeyhole}
        />
      </div>

      <ChangeDisplayNameDialog
        setDialogIsOpen={setDialogIsOpenChangeDisplayName}
        dialogIsOpen={dialogIsOpenChangeDisplayName}
      />

      <ChangeEmailDialog
        setDialogIsOpen={setDialogIsOpenChangeEmail}
        dialogIsOpen={dialogIsOpenChangeEmail}
      />

      <ChangePasswordDialog
        setDialogIsOpen={setDialogIsOpenChangePassword}
        dialogIsOpen={dialogIsOpenChangePassword}
      />
    </div>
  );
};

export default UserSettings;

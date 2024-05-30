'use client';

import { firebaseAuth } from '@/lib/firebase/firebase';
import { RouteName } from '@/shared/router/Routes.enum';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {FC, ReactElement} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import UserSettingsTextItem from './UserSettingsTextItem';
import { User, Mail, LockKeyhole } from 'lucide-react';

const UserSettings: FC = (): ReactElement => {
	const [user] = useAuthState(firebaseAuth);

	return (
		<div className={'w-full h-full flex flex-col gap-6 py-6'}>
			<PageTitle title={RouteName.USER_SETTINGS}/>

			<div>
				<GoToPreviousPageButton/>
			</div>

			<div className="w-full flex flex-col items-start justify-start gap-6">
				<UserSettingsTextItem
					title='Display name'
					itemData={user?.displayName || 'User'}
					buttonTitle='Change display name'
					ButtonIcon={User}/>

				<UserSettingsTextItem
					title='Email'
					itemData={user?.email || 'email@com'}
					buttonTitle='Change email'
					ButtonIcon={Mail}/>

				<UserSettingsTextItem
					title='Password'
					itemData={'******'}
					buttonTitle='Change password'
					ButtonIcon={LockKeyhole}/>
			</div>
		</div>
	);
};

export default UserSettings;

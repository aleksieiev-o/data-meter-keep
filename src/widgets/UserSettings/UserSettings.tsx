'use client';

import { firebaseAuth } from '@/lib/firebase/firebase';
import { RouteName } from '@/shared/router/Routes.enum';
import PageTitle from '@/shared/widgets/PageTitle';
import {FC, ReactElement} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserSettings: FC = (): ReactElement => {
	const [user] = useAuthState(firebaseAuth);

	return (
		<div className={'w-full h-full flex flex-col gap-6 py-6'}>
			<PageTitle title={RouteName.USER_SETTINGS}/>

			<div className="w-full flex sm:flex-row flex-col sm:items-center items-end justify-between gap-6">
				
			</div>
		</div>
	);
};

export default UserSettings;

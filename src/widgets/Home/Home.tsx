import {FC, ReactElement} from 'react';
import { APP_DESCRIPTION, APP_NAME } from '@/shared/appConstants';

const Home: FC = (): ReactElement => {
	return (
		<div className={'w-full h-full flex flex-col items-center justify-center gap-6 py-6'}>
			<h1 className='font-bold text-4xl'>{APP_NAME}</h1>

			<p>{APP_DESCRIPTION}</p>
		</div>
	);
};

export default Home;

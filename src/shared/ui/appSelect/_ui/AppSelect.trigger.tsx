import { Skeleton } from '@/components/ui/skeleton';
import {SelectTrigger, SelectValue} from '@/components/ui/select';
import {FC} from 'react';

interface Props {
	id: string;
	placeholder: string;
	disabled: boolean;
	isDataPending: boolean;
}

const AppSelectTrigger: FC<Props> = (props) => {
	const {id, placeholder, disabled, isDataPending} = props;

	return (
		<>
			{
				isDataPending ?
				<Skeleton className={'w-full h-12 rounded-md border'}/>
				:
				<SelectTrigger id={id} disabled={disabled} className={'w-full'}>
					<SelectValue placeholder={placeholder}/>
				</SelectTrigger>
			}
		</>
	);
};

export default AppSelectTrigger;

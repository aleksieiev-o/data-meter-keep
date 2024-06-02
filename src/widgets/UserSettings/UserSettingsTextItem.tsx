import {Dispatch, ElementType, FC, ReactElement, SetStateAction} from 'react';
import { Button } from '@/components/ui/button';

interface Props {
	title: string;
	itemData: string;
	ButtonIcon: ElementType;
	buttonTitle: string;
	handleClick: () => void;
}

const UserSettingsTextItem: FC<Props> = (props): ReactElement => {
	const {title, itemData, buttonTitle, ButtonIcon, handleClick} = props;

	return (
		<div className='flex flex-col items-start justify-center gap-4'>
			<div className='flex flex-row flex-nowrap items-center justify-start gap-4'>
				<h6 className='font-bold text-lg'>
					{title}:
				</h6>

				<p>
					{itemData}
				</p>
			</div>

			<Button
				onClick={handleClick}
				title={buttonTitle}>
				<ButtonIcon className={'w-5 h-5 mr-4'}/>

				<p>
					{buttonTitle}
				</p>
			</Button>
		</div>
	);
};

export default UserSettingsTextItem;

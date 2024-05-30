import {ElementType, FC, ReactElement} from 'react';

interface Props {
	Icon: ElementType;
	title: string;
}

const DropdownMenuItemContent: FC<Props> = (props): ReactElement => {
	const {Icon, title} = props;

	return (
		<div className='flex flex-row flex-nowrap items-center justify-start gap-4'>
			<Icon className={'h-5 w-5'}/>

			<span>{title}</span>
		</div>
	);
};

export default DropdownMenuItemContent;

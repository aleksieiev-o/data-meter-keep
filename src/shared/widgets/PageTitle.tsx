import {FC, ReactElement} from 'react';

interface Props {
	title: string;
}

const PageTitle: FC<Props> = (props): ReactElement => {
	const {title} = props;

	return (
		<h1 className='text-3xl font-bold text-nowrap text-ellipsis'>
			{title}
		</h1>
	);
};

export default PageTitle;

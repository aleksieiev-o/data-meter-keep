import {Label} from '@/components/ui/label';
import {Select} from '@/components/ui/select';
import {FC} from 'react';
import AppSelectContent from './_ui/AppSelect.content';
import AppSelectTrigger from './_ui/AppSelect.trigger';

/* tslint:disable */
interface Props {
	id: string;
	label: string;
	placeholder: string;
	disabled: boolean;
	isDataPending: boolean;
	dataList: Array<any>; // TODO fix type
	emptyDataListMessage: string;
	currentValue: string;
	setCurrentValue: (value: string) => void;
	width: number | 'full';
}
/* tslint:enable */

const AppSelect: FC<Props> = (props) => {
	const {id, label, placeholder, dataList, emptyDataListMessage, disabled, isDataPending, currentValue, setCurrentValue, width} = props;

	return (
		<div className={'flex flex-col gap-4'}>
				<Label htmlFor={id}>
					{label}
				</Label>

				<Select onValueChange={(value) => setCurrentValue(value)} defaultValue={currentValue}>
					<AppSelectTrigger id={id} placeholder={placeholder} disabled={disabled} isDataPending={isDataPending} width={width}/>

					<AppSelectContent dataList={dataList} emptyDataListMessage={emptyDataListMessage}/>
				</Select>
			</div>
	);
};

export default AppSelect;

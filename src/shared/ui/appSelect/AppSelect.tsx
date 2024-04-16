import {Label} from '@/components/ui/label';
import {Select} from '@/components/ui/select';
import {Dispatch, FC, SetStateAction} from 'react';
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
	setCurrentValue: (value: string) => Dispatch<SetStateAction<string>>;
}
/* tslint:enable */

const AppSelect: FC<Props> = (props) => {
	const {id, label, placeholder, dataList, emptyDataListMessage, disabled, isDataPending, currentValue, setCurrentValue} = props;

	return (
		<div className={'w-full flex flex-col items-end gap-4'}>
				<Label htmlFor={id}>
					{label}
				</Label>

				<Select onValueChange={(value) => setCurrentValue(value)} defaultValue={currentValue}>
					<AppSelectTrigger id={id} placeholder={placeholder} disabled={disabled} isDataPending={isDataPending}/>

					<AppSelectContent dataList={dataList} emptyDataListMessage={emptyDataListMessage}/>
				</Select>
			</div>
	);
};

export default AppSelect;

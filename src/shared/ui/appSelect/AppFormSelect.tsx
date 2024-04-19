import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import {Select} from '@/components/ui/select';
import {FC} from 'react';
import AppSelectTrigger from './_ui/AppSelect.trigger';
import AppSelectContent from './_ui/AppSelect.content';

/* tslint:disable */
interface Props {
	formModel: any; // TODO fix type
	id: string;
	name: string;
	label: string;
	placeholder: string;
	required: boolean;
	disabled: boolean;
	isDataPending: boolean;
	dataList: Array<any>; // TODO fix type
	emptyDataListMessage: string;
}
/* tslint:enable */

const AppFormSelect: FC<Props> = (props) => {
	const {formModel, id, name, label, placeholder, dataList, emptyDataListMessage, required, disabled, isDataPending} = props;

	return (
		<FormField
			control={formModel.control}
			name={name}
			render={({field}) => (
				<FormItem className={'w-full'}>
					<FormLabel htmlFor={id} aria-required={required}>
						{label}
					</FormLabel>

					<Select onValueChange={field.onChange} {...field}>
						<FormControl aria-required={required}>
							<AppSelectTrigger id={id} placeholder={placeholder} disabled={disabled} isDataPending={isDataPending} width={'full'}/>
						</FormControl>

						<AppSelectContent dataList={dataList} emptyDataListMessage={emptyDataListMessage}/>
					</Select>
				</FormItem>
			)}>
		</FormField>
	);
};

export default AppFormSelect;

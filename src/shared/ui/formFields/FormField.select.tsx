import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import {SelectContent, SelectItem, SelectTrigger, Select, SelectValue} from '@/components/ui/select';
import {FC} from 'react';

/* tslint:disable */
interface Props {
	formModel: any; // TODO fix type
	name: string;
	label: string;
	placeholder: string;
	isRequired: boolean;
	isDisabled: boolean;
	isDataPending: boolean;
	dataList: Array<any>; // TODO fix type
	emptyDataListMessage: string;
}
/* tslint:enable */

const FormFieldSelect: FC<Props> = (props) => {
	const {formModel, name, label, placeholder, dataList, emptyDataListMessage, isRequired, isDisabled, isDataPending} = props;

	return (
		<FormField
			control={formModel.control}
			name={name}
			render={({field}) => (
				<FormItem className={'w-full'}>
					<FormLabel aria-required={isRequired}>
						{label}
					</FormLabel>

					<Select onValueChange={field.onChange} {...field}>
						<FormControl aria-required={isRequired}>
							{
								isDataPending ?
								<Skeleton className={'w-full h-12 rounded-md border'}/>
								:
								<SelectTrigger className={'w-full'} disabled={isDisabled}>
									<SelectValue
										placeholder={placeholder}
										aria-required={isRequired}/>
								</SelectTrigger>
							}
						</FormControl>

						<SelectContent>
							{
								dataList && dataList.length > 0 ?
								dataList.map((category) => (
									<SelectItem key={category.categoryId} value={category.categoryId}>
										{category.categoryName}
									</SelectItem>
								))
								:
								<SelectItem value='null' disabled={isRequired}>
									{emptyDataListMessage}
								</SelectItem>
							}
						</SelectContent>
					</Select>
				</FormItem>
			)}>
		</FormField>
	);
};

export default FormFieldSelect;

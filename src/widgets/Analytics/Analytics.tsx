'use client';

import {FC, useMemo, useState} from 'react';
import { RoutePath } from '@/shared/router/Routes.enum';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Chart, ChartWrapperOptions } from 'react-google-charts';
import { fetchNotes } from '@/entities/notes/notes.service';
import { firebaseAuth } from '@/lib/firebase/firebase';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/entities/categories/categories.service';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Skeleton} from '@/components/ui/skeleton';
import {Label} from '@/components/ui/label';
import {useTheme} from 'next-themes';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';

const Analytics: FC = () => {
	const [user] = useAuthState(firebaseAuth);
	const { theme } = useTheme();
	const [currentCategoryId, setCurrentCategoryId] = useState<string>('');

	const { data: categoriesQueryData, isPending: categoriesIsPending, isSuccess: categoriesIsSuccess } = useQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: async () => await fetchCategories(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

	const { data: notesQueryData, isPending: notesIsPending, isSuccess: notesIsSuccess } = useQuery({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: async () => await fetchNotes(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

	const chartData = useMemo(() => {
		const currentCategory = categoriesQueryData?.find((category) => category.categoryId === currentCategoryId);

		if (currentCategory) {
			const mappedData = notesQueryData
				?.filter((note) => note.categoryId === currentCategoryId)
				.map((note) => ([new Date(note.endCalculationDate), note.noteValue * note.noteCoefficient])) || [];

			return [['Category name', currentCategory.categoryName], ...mappedData];
		}

		return [];
	}, [currentCategoryId, categoriesQueryData, notesQueryData]);

	const data1 = [
		['Category name', 'Category 1'],
		[new Date('2024-03-01T22:00:00.000Z'), 12],
		[new Date('2024-04-01T22:00:00.000Z'), 34],
		[new Date('2024-05-01T22:00:00.000Z'), 45],
		[new Date('2024-06-01T22:00:00.000Z'), 78],
		[new Date('2024-07-01T22:00:00.000Z'), 57],
		[new Date('2024-08-01T22:00:00.000Z'), 99],
	];

	const chartColors = useMemo(() => {
		const isDarkTheme = theme === AppThemeEnum.DARK;

		return {
			textColor: { color: isDarkTheme ? '#fff' : 'rgb(54, 60, 66)' },
			gridColor: { color: isDarkTheme ? 'rgb(54, 60, 66)' : 'rgb(54, 60, 66)' },
		};
	}, [theme]);

	const options: ChartWrapperOptions['options'] = useMemo(() => ({
		title: 'Analytics of the notes list',
		hAxis: { title: 'End calculation date', textStyle: chartColors.textColor, titleTextStyle: chartColors.textColor, gridlines: chartColors.gridColor },
		vAxis: { title: 'Value', textStyle: chartColors.textColor, titleTextStyle: chartColors.textColor, gridlines: chartColors.gridColor },
		backgroundColor: 'transparent',
		legend: { position: 'right', textStyle: chartColors.textColor },
	}), [chartColors.gridColor, chartColors.textColor]);

	return (
		<div className='w-full h-full flex flex-col items-start justify-start gap-4'>
			{
				categoriesQueryData && categoriesQueryData.length ?
					<div className={'w-full flex flex-col items-end gap-4'}>
						<Label htmlFor="analytics-set-category">
							Categories list
						</Label>

						<Select onValueChange={(value) => setCurrentCategoryId(value)} defaultValue={currentCategoryId}>
							<SelectTrigger className={'w-[250px]'} id='analytics-set-category'>
								<SelectValue
									placeholder={'Select category'}
									aria-required={true}/>
							</SelectTrigger>

							<SelectContent>
								{
									categoriesQueryData.map((category) => (
										<SelectItem key={category.categoryId} value={category.categoryId}>
											{category.categoryName}
										</SelectItem>
									))
								}
							</SelectContent>
						</Select>
					</div>
					:
					<div className={'w-full flex flex-col items-end gap-4'}>
						{
							categoriesIsPending ?
								<Skeleton className={'w-[250px] h-12 rounded-md border'}/>
								:
								<p>
									There are no categories yet.
								</p>
						}
					</div>
			}
												
			<Chart
				chartType="LineChart"
				width="100%"
				height="500px"
				data={data1} /* TODO add chartData there */
				options={options}/>
		</div>
	);
};

export default Analytics;

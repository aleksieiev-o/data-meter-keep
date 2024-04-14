'use client';

import {FC, useMemo, useState} from 'react';
import { RoutePath } from '@/shared/router/Routes.enum';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchNotes } from '@/entities/notes/notes.service';
import { firebaseAuth } from '@/lib/firebase/firebase';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/entities/categories/categories.service';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Skeleton} from '@/components/ui/skeleton';
import {Label} from '@/components/ui/label';
import AnalyticsChart from './AnalyticsChart';

const Analytics: FC = () => {
	const [user] = useAuthState(firebaseAuth);
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
			.map((note) => {
				const formattedDate = new Date(note.endCalculationDate).toLocaleDateString('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				});

				return [formattedDate, note.noteValue * note.noteCoefficient];
			}) || [];

			if (mappedData.length) {
				return [['Category name', currentCategory.categoryName], ...mappedData];
			}

			return [];
		}

		return [];
	}, [currentCategoryId, categoriesQueryData, notesQueryData]);

	return (
		<div className='w-full h-full flex flex-col gap-6 py-6'>
			{
				categoriesQueryData && categoriesQueryData.length > 0 ?
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
							categoriesIsPending && <Skeleton className={'w-[250px] h-12 rounded-md border'}/>
						}
					</div>
			}

			<AnalyticsChart
				isDataSuccess={categoriesIsSuccess && notesIsSuccess}
				isDataPending={categoriesIsPending && notesIsPending}
				isDataNotEmpty={!!(categoriesQueryData && categoriesQueryData.length > 0)}
				isChartListNotEmpty={!!chartData.length}
				isMainCriterionSelected={!!currentCategoryId}
				chartData={chartData}
				chartType='AreaChart'/>
		</div>
	);
};

export default Analytics;

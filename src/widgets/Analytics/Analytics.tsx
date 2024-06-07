'use client';

import {FC, useMemo, useState} from 'react';
import { RouteName, RoutePath } from '@/shared/router/Routes.enum';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchNotes } from '@/entities/notes/notes.service';
import { firebaseAuth } from '@/lib/firebase/firebase';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/entities/categories/categories.service';
import AnalyticsChart from './AnalyticsChart';
import AppSelect from '@/shared/ui/appSelect/AppSelect';
import PageTitle from '@/shared/widgets/PageTitle';

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
			<PageTitle title={RouteName.ANALYTICS}/>

			<div className='w-full h-full flex flex-col lg:flex-row gap-6 py-6'>
				<div className='w-[250px] flex flex-col gap-4'>
					<AppSelect
						id={'analytics-categories-select'}
						label={'List of categories'}
						placeholder={'Select category'}
						disabled={false}
						isDataPending={categoriesIsPending}
						dataList={categoriesQueryData || []}
						emptyDataListMessage={'There are no categories yet'}
						currentValue={currentCategoryId}
						setCurrentValue={(value) => setCurrentCategoryId(value)}
						width={250}/>
				</div>

				<AnalyticsChart
					isDataSuccess={categoriesIsSuccess && notesIsSuccess}
					isDataPending={categoriesIsPending && notesIsPending}
					isDataNotEmpty={!!(categoriesQueryData && categoriesQueryData.length > 0)}
					isChartListNotEmpty={!!chartData.length}
					isMainCriterionSelected={!!currentCategoryId}
					chartData={chartData}
					chartType='AreaChart'/>
			</div>
		</div>
	);
};

export default Analytics;

'use client';

import {FC, useId, useMemo, useState} from 'react';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {useAuthState} from 'react-firebase-hooks/auth';
import {fetchNotes} from '@/entities/notes/notes.service';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from '@/entities/categories/categories.service';
import AnalyticsChart from './AnalyticsChart';
import AppSelect from '@/shared/ui/appSelect/AppSelect';
import PageTitle from '@/shared/widgets/PageTitle';

enum EDiffMode {
  DIFF_AC = 'diff-ac',
  VALUES = 'values',
}

const Analytics: FC = () => {
  const categoryDiffMode = useId();
  const selectedCategoryId = useId();
  const [user] = useAuthState(firebaseAuth);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>('');
  const [diffMode, setDiffMode] = useState<EDiffMode>(EDiffMode.DIFF_AC);

  const {
    data: categoriesQueryData,
    isPending: categoriesIsPending,
    isSuccess: categoriesIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: async () => await fetchCategories(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const {
    data: notesQueryData,
    isPending: notesIsPending,
    isSuccess: notesIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: async () => await fetchNotes(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const diffModes = useMemo(() => {
    return [
      {categoryId: EDiffMode.DIFF_AC, categoryName: 'Difference mode'},
      {categoryId: EDiffMode.VALUES, categoryName: 'Values mode'},
    ];
  }, []);

  const chartData = useMemo(() => {
    const currentCategory = categoriesQueryData?.find(
      (category) => category.categoryId === currentCategoryId,
    );

    if (currentCategory) {
      const mappedData =
        notesQueryData
          ?.filter((note) => note.categoryId === currentCategoryId)
          .map((note, idx, array) => {
            const formattedDate = new Date(
              note.endCalculationDate,
            ).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            if (diffMode === EDiffMode.DIFF_AC) {
              if (array.length === 1) {
                return [formattedDate, 0];
              } else {
                let diffResult = 0;

                if (idx > 0) {
                  const arrItem = array[idx - 1];

                  if (arrItem) {
                    diffResult =
                      note.noteValue * note.noteCoefficient -
                      arrItem.noteValue * arrItem.noteCoefficient;
                    return [formattedDate, diffResult];
                  }
                }

                return [formattedDate, diffResult];
              }
            } else {
              return [formattedDate, note.noteValue * note.noteCoefficient];
            }
          }) || [];

      if (mappedData.length) {
        return [['Category name', currentCategory.categoryName], ...mappedData];
      }

      return [];
    }

    return [];
  }, [categoriesQueryData, currentCategoryId, notesQueryData, diffMode]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageTitle title={RouteName.ANALYTICS} />

      <div className="flex h-full w-full flex-col gap-6 py-6 lg:flex-row">
        <div className="flex w-[250px] flex-col gap-4">
          <AppSelect
            id={categoryDiffMode}
            label={'Category view mode'}
            placeholder={'Select category view mode'}
            disabled={false}
            isDataPending={categoriesIsPending}
            dataList={diffModes}
            emptyDataListMessage={'There are no modes yet'}
            currentValue={diffMode}
            setCurrentValue={(value) => setDiffMode(value as EDiffMode)}
            width={250}
          />

          <AppSelect
            id={selectedCategoryId}
            label={'List of categories'}
            placeholder={'Select category'}
            disabled={false}
            isDataPending={categoriesIsPending}
            dataList={categoriesQueryData || []}
            emptyDataListMessage={'There are no categories yet'}
            currentValue={currentCategoryId}
            setCurrentValue={(value) => setCurrentCategoryId(value)}
            width={250}
          />
        </div>

        <AnalyticsChart
          isDataSuccess={categoriesIsSuccess && notesIsSuccess}
          isDataPending={categoriesIsPending && notesIsPending}
          isDataNotEmpty={
            !!(categoriesQueryData && categoriesQueryData.length > 0)
          }
          isChartListNotEmpty={!!chartData.length}
          isMainCriterionSelected={!!currentCategoryId}
          chartData={chartData}
          chartType="AreaChart"
        />
      </div>
    </div>
  );
};

export default Analytics;

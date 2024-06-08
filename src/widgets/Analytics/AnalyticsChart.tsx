'use client';

import {FC, useMemo} from 'react';
import {AppThemeEnum} from '@/shared/types/appTheme.enum';
import {Chart, ChartWrapperOptions} from 'react-google-charts';
import {useTheme} from 'next-themes';
import {Skeleton} from '@/components/ui/skeleton';

interface Props {
  isDataNotEmpty: boolean;
  isDataSuccess: boolean;
  isDataPending: boolean;
  isMainCriterionSelected: boolean;
  isChartListNotEmpty: boolean;
  chartData: (string | number)[][];
  chartType: 'LineChart' | 'AreaChart';
}

const AnalyticsChart: FC<Props> = (props) => {
  const {
    isDataSuccess,
    isDataPending,
    isDataNotEmpty,
    isChartListNotEmpty,
    isMainCriterionSelected,
    chartData,
    chartType,
  } = props;
  const {theme} = useTheme();

  const chartColors = useMemo(() => {
    const isDarkTheme = theme === AppThemeEnum.DARK;
    const colorChoice = {color: isDarkTheme ? '#fff' : 'rgb(54, 60, 66)'};

    return {
      title: colorChoice,
      titleTextStyle: colorChoice,
      textColor: colorChoice,
      gridColor: {color: 'rgb(54, 60, 66)'},
    };
  }, [theme]);

  const options: ChartWrapperOptions['options'] = useMemo(
    () => ({
      title: 'Analytics of the notes list',
      hAxis: {
        title: 'End calculation date',
        textStyle: chartColors.textColor,
        titleTextStyle: chartColors.textColor,
        gridlines: chartColors.gridColor,
      },
      vAxis: {
        title: 'Value',
        textStyle: chartColors.textColor,
        titleTextStyle: chartColors.textColor,
        gridlines: chartColors.gridColor,
      },
      backgroundColor: 'transparent',
      legend: {position: 'bottom', textStyle: chartColors.textColor},
      titleTextStyle: {color: chartColors.titleTextStyle},
    }),
    [chartColors.gridColor, chartColors.textColor, chartColors.titleTextStyle],
  );

  return (
    <>
      {isDataSuccess && isChartListNotEmpty && isMainCriterionSelected && (
        <div className="w-full lg:h-[500px] lg:overflow-x-auto lg:overflow-y-hidden">
          <Chart
            chartType={chartType}
            width="100%"
            height="500px"
            data={chartData}
            options={options}
          />
        </div>
      )}

      {isDataPending && (
        <Skeleton className={'h-[500px] w-full rounded-md border'} />
      )}

      {isDataNotEmpty &&
        isDataSuccess &&
        !isChartListNotEmpty &&
        !isMainCriterionSelected && (
          <div className={'flex h-full w-full items-start justify-center'}>
            <p>Please select your category from the list above.</p>
          </div>
        )}

      {isDataSuccess && isMainCriterionSelected && !isChartListNotEmpty && (
        <div className={'flex h-full w-full items-start justify-center'}>
          <p>
            There are no notes in this category. Chart can not be available.
          </p>
        </div>
      )}

      {isDataSuccess && !isDataNotEmpty && (
        <div className={'flex h-full w-full items-start justify-center'}>
          <p>There are no categories yet.</p>
        </div>
      )}
    </>
  );
};

export default AnalyticsChart;

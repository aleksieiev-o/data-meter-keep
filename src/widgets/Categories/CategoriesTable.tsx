'use client';

import {ReactElement, useContext, useState} from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {Input} from '@/components/ui/input';
import CreateCategoryDialog from '@/features/categories/CreateCategory.dialog';
import {fetchCategories} from '@/entities/categories/categories.service';
import {useQuery} from '@tanstack/react-query';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import AppTable from '@/shared/ui/appTable/AppTable';
import AppTablePageControls from '@/shared/ui/appTable/_ui/AppTablePageControls';
import PageTitle from '@/shared/widgets/PageTitle';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {useDebounce} from '@/shared/hooks/useDebounce';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

const CategoriesTable = <TData, TValue>(
  props: Props<TData, TValue>,
): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<string>('');
  const {user} = useContext(AppAuthContext);
  const columnFiltersDebouncedValue = useDebounce(columnFilters, 500);

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

  const table = useReactTable({
    data: categoriesIsSuccess ? (categoriesQueryData as TData[]) : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      globalFilter: columnFiltersDebouncedValue,
    },
  });

  return (
    <div className={'flex h-full w-full flex-col gap-6 py-6'}>
      <PageTitle title={RouteName.CATEGORY_LIST} />

      <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
        <Input
          onChange={(event) => setColumnFilters(event.target.value)}
          disabled={!categoriesQueryData || !categoriesQueryData.length}
          value={columnFilters}
          placeholder={'Try to search something...'}
          className={'h-12 w-full'}
        />

        <div>
          <CreateCategoryDialog />
        </div>
      </div>

      <AppTable
        table={table}
        columns={columns}
        isPending={categoriesIsPending}
      />

      {categoriesQueryData && categoriesQueryData.length > 5 && (
        <AppTablePageControls table={table} />
      )}
    </div>
  );
};

export default CategoriesTable;

'use client';

import {ReactElement, useContext, useState} from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
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

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const CategoriesTable = <TData, TValue>(
  props: Props<TData, TValue>,
): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const {user} = useContext(AppAuthContext);

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
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div className={'flex h-full w-full flex-col gap-6 py-6'}>
      <PageTitle title={RouteName.CATEGORY_LIST} />

      <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
        <Input
          onChange={(event) =>
            table.getColumn('categoryName')?.setFilterValue(event.target.value)
          }
          disabled={!categoriesQueryData || !categoriesQueryData.length}
          value={
            (table.getColumn('categoryName')?.getFilterValue() as string) ?? ''
          }
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

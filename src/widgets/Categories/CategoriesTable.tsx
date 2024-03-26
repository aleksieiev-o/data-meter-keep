'use client';

import {ReactElement, useState} from 'react';
import {
  ColumnDef, ColumnFiltersState,
  getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {Input} from '@/components/ui/input';
import CreateCategoryDialog from '@/features/categories/CreateCategory.dialog';
import {fetchCategories} from '@/entities/categories/categories.service';
import {useQuery} from '@tanstack/react-query';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {ICategory} from '@/shared/types/categories.types';
import {RoutePath} from '@/shared/router/Routes.enum';
import EmptyDataAppTable from '@/shared/ui/appTable/EmptyDataAppTable';
import AppTable from '@/shared/ui/appTable/AppTable';
import AppTablePageControls from '@/shared/ui/appTable/_ui/AppTablePageControls';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const CategoriesTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [user] = useAuthState(firebaseAuth);

  const { data: queryData, isPending } = useQuery<ICategory>({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: async () => await fetchCategories(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  /* tslint:disable */
  const table = useReactTable({
    data: queryData,
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
  /* tslint:enable */

  return (
    <div className={'w-full h-full flex flex-col gap-6 py-6'}>
      <div className="w-full flex sm:flex-row flex-col sm:items-center items-end justify-between gap-6">
        <Input
          onChange={(event) => table.getColumn('categoryName')?.setFilterValue(event.target.value)}
          disabled={!queryData || !queryData.length}
          value={(table.getColumn('categoryName')?.getFilterValue() as string) ?? ''}
          placeholder={'Try to search something...'}
          className={'w-full h-12'}/>

        <CreateCategoryDialog/>
      </div>

      {
        queryData ?
          <AppTable table={table} columns={columns} isPending={isPending}/>
          :
          <EmptyDataAppTable text={'There are no categories yet.'}/>
      }

      {
        queryData && queryData.length > 5 && <AppTablePageControls table={table}/>
      }
    </div>
  );
};

export default CategoriesTable;

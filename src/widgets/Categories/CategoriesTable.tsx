'use client';

import {ReactElement, useState} from 'react';
import {
  ColumnDef, ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import CreateCategoryDialog from '@/features/categories/CreateCategory.dialog';
import {fetchCategories} from '@/entities/categories/categories.service';
import {useQuery} from '@tanstack/react-query';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {Skeleton} from '@/components/ui/skeleton';
import {ICategory} from '@/shared/types/categories.types';
import {RoutePath} from '@/shared/router/Routes.enum';

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
          placeholder={'Filter categories names...'}
          className={'w-full h-12'}/>

        <CreateCategoryDialog/>
      </div>

      <div className="rounded-md border">
        {
          !isPending ?
            <Table>
              <TableHeader>
                {
                  table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {
                        headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </TableHead>
                          );
                        })
                      }
                    </TableRow>
                  ))
                }
              </TableHeader>

              <TableBody>
                {
                  table.getRowModel()?.rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
            :
            <Skeleton className={'h-[144px] w-full rounded-md border'}/>
        }
      </div>

      {
        queryData && queryData.length > 5 &&
        <div className="flex items-center justify-end gap-6 mt-auto">
          <Button
            onClick={() => table.previousPage()}
            variant={'default'}
            title={'Previous page'}
            disabled={!table.getCanPreviousPage()}>
            <ChevronLeft/>

            <span className={'sm:inline hidden ml-2'}>
            Previous page
          </span>
          </Button>

          <Button
            onClick={() => table.nextPage()}
            variant={'default'}
            title={'Next page'}
            disabled={!table.getCanNextPage()}>
          <span className={'sm:inline hidden mr-2'}>
            Next page
          </span>

            <ChevronRight/>
          </Button>
        </div>
      }
    </div>
  );
};

export default CategoriesTable;

'use client';

import {ReactElement, useState} from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {useQuery} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {INote} from '@/shared/types/notes.types';
import {fetchNotes} from '@/entities/notes/notes.service';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import AppTable from '@/shared/ui/AppTable/AppTable';
import EmptyDataAppTable from '@/shared/ui/AppTable/EmptyDataAppTable';
import AppTablePageControls from '@/shared/ui/AppTable/_ui/AppTablePageControls';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const NotesTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 7});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [user] = useAuthState(firebaseAuth);

  const { data: queryData, isPending } = useQuery<INote>({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: async () => await fetchNotes(),
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
          onChange={(event) => table.getColumn('categoryId')?.setFilterValue(event.target.value)}
          disabled={!queryData || !queryData.length}
          value={(table.getColumn('categoryId')?.getFilterValue() as string) ?? ''}
          placeholder={'Filter notes by their category name...'}
          className={'w-full h-12'}/>

        <Link href={RoutePath.CRETE_NOTE}>
          <Button variant={'default'} title={'Add note'}>
            <Plus/>

            <span className={'ml-2'}>
            Add note
          </span>
          </Button>
        </Link>
      </div>

      {
        queryData ?
          <AppTable table={table} columns={columns} isPending={isPending}/>
          :
          <EmptyDataAppTable text={'There are no notes yet.'}/>
      }

      {
        queryData && queryData.length > 5 && <AppTablePageControls table={table}/>
      }
    </div>
  );
};

export default NotesTable;

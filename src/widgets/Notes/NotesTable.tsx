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
import {fetchNotes} from '@/entities/notes/notes.service';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import AppTable from '@/shared/ui/appTable/AppTable';
import EmptyDataAppTable from '@/shared/ui/appTable/EmptyDataAppTable';
import AppTablePageControls from '@/shared/ui/appTable/_ui/AppTablePageControls';
import {ENoteTableColumnAccessorKeys} from '@/widgets/Notes/_ui/notesColumns';
import AppTableNoteFilterSelect from '@/shared/ui/appTable/_ui/AppTableNoteFilter.select';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const NotesTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 7});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filteredColumn, setFilteredColumn] = useState<ENoteTableColumnAccessorKeys>(ENoteTableColumnAccessorKeys.CATEGORY_ID);
  const [user] = useAuthState(firebaseAuth);

  const { data: notesQueryData, isPending: notesIsPending, isSuccess: notesIsSuccess } = useQuery({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: async () => await fetchNotes(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const table = useReactTable({
    data: notesIsSuccess ? notesQueryData as TData[] : [],
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
    <div className={'w-full h-full flex flex-col gap-6 py-6'}>
      <div className="w-full flex sm:flex-row flex-col sm:items-center items-end justify-between gap-6">
        <div className={'w-full flex flex-row items-end gap-2'}>
          <Input
            onChange={(event) => table.getColumn(filteredColumn)?.setFilterValue(event.target.value)}
            disabled={!notesQueryData || !notesQueryData.length}
            value={(table.getColumn(filteredColumn)?.getFilterValue() as string) ?? ''}
            placeholder={'Try to search something...'}
            className={'w-full h-12'}/>

          <AppTableNoteFilterSelect table={table} setFilteredColumn={setFilteredColumn}/>
        </div>

        <Link href={RoutePath.CRETE_NOTE}>
          <Button variant={'default'} title={'Create note'}>
            <Plus/>

            <span className={'ml-2'}>
            Create note
          </span>
          </Button>
        </Link>
      </div>

      <AppTable table={table} columns={columns} isPending={notesIsPending}/>

      {
        notesQueryData && notesQueryData.length > 5 && <AppTablePageControls table={table}/>
      }
    </div>
  );
};

export default NotesTable;

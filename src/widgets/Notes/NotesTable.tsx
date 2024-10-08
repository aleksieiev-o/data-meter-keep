'use client';

import {ReactElement, useContext, useMemo, useState} from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {useQuery} from '@tanstack/react-query';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {fetchSortedWithDateNotes} from '@/entities/notes/notes.service';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import AppTable from '@/shared/ui/appTable/AppTable';
import AppTablePageControls from '@/shared/ui/appTable/_ui/AppTablePageControls';
import {fetchCategories} from '@/entities/categories/categories.service';
import {INoteAugmented} from '@/shared/types/notes.types';
import PageTitle from '@/shared/widgets/PageTitle';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {useDebounce} from '@/shared/hooks/useDebounce';

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

const NotesTable = <TData, TValue>(
  props: Props<TData, TValue>,
): ReactElement => {
  const {columns} = props;
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<string>('');
  const {user} = useContext(AppAuthContext);
  const columnFiltersDebouncedValue = useDebounce(columnFilters, 500);

  const {data: categoriesQueryData, isSuccess: categoriesIsSuccess} = useQuery({
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
    queryFn: async () => await fetchSortedWithDateNotes(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const notesListAugmented = useMemo(() => {
    if (categoriesIsSuccess && notesIsSuccess) {
      const categoryMap = new Map(
        categoriesQueryData.map((category) => [
          category.categoryId,
          category.categoryName,
        ]),
      );

      const augmentedNotes: INoteAugmented[] = notesQueryData.map((note) => ({
        ...note,
        categoryName: categoryMap.get(note.categoryId) || 'Unknown name',
      }));

      return augmentedNotes;
    }
  }, [
    categoriesIsSuccess,
    categoriesQueryData,
    notesIsSuccess,
    notesQueryData,
  ]);

  const table = useReactTable({
    data: notesIsSuccess ? (notesListAugmented as TData[]) : [],
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
      <PageTitle title={RouteName.NOTE_LIST} />

      <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
        <Input
          onChange={(event) => setColumnFilters(event.target.value)}
          disabled={!notesQueryData || !notesQueryData.length}
          value={columnFilters}
          placeholder={'Try to search something...'}
          className={'h-12 w-full'}
        />

        <div
          className={
            'flex w-full flex-col items-end gap-6 xs:flex-row sm:w-auto'
          }
        >
          <Link href={RoutePath.CRETE_NOTE} className="w-full sm:w-auto">
            <Button
              variant={'default'}
              title={'Create note'}
              className="w-full sm:w-[200px]"
            >
              <Plus />

              <span className={'ml-2'}>Create note</span>
            </Button>
          </Link>
        </div>
      </div>

      <AppTable table={table} columns={columns} isPending={notesIsPending} />

      {notesQueryData && notesQueryData.length > 5 && (
        <AppTablePageControls table={table} />
      )}
    </div>
  );
};

export default NotesTable;

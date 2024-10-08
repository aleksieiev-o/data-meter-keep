'use client';

import {ColumnDef} from '@tanstack/react-table';
import TableColumnHeaderWithSort from '@/shared/ui/tanstackReactTable/TableColumnHeaderWithSort';
import {INote} from '@/shared/types/notes.types';
import NoteTableRowActions from '@/widgets/Notes/_ui/NoteTableRowActions';
import {parseDate} from '@/shared/utils/parceDate';

type TColumns = Omit<INote, ''>;

export enum ENoteTableColumnAccessorKeys {
  NOTE_ID = 'noteId',
  CATEGORY_NAME = 'categoryName',
  END_CALCULATION_DATE = 'endCalculationDate',
  NOTE_VALUE = 'noteValue',
  NOTE_COEFFICIENT = 'noteCoefficient',
  NOTE_DESCRIPTION = 'noteDescription',
}

export const notesColumns: ColumnDef<TColumns>[] = [
  {
    accessorKey: ENoteTableColumnAccessorKeys.NOTE_ID,
    footer: 'Note ID', // TODO FIX: put these titles "footer: '......'" to another field
    header: () => (
      <div className="whitespace-nowrap text-start font-bold">Note ID</div>
    ),
    cell: ({row}) => (
      <div className="w-[70px] overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(ENoteTableColumnAccessorKeys.NOTE_ID)}
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: ENoteTableColumnAccessorKeys.CATEGORY_NAME,
    footer: 'Note category',
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'Note category'}
        menuName={'Note sorting'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {row.getValue(ENoteTableColumnAccessorKeys.CATEGORY_NAME)}
      </div>
    ),
    enableGlobalFilter: true,
  },
  {
    accessorKey: ENoteTableColumnAccessorKeys.END_CALCULATION_DATE,
    footer: 'End calculation date',
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'End calculation date'}
        menuName={'End calculation date'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {parseDate(
          row.getValue(ENoteTableColumnAccessorKeys.END_CALCULATION_DATE),
        )}
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: ENoteTableColumnAccessorKeys.NOTE_VALUE,
    footer: 'Value',
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'Value'}
        menuName={'Value'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {Number(row.getValue(ENoteTableColumnAccessorKeys.NOTE_VALUE)) *
          Number(row.getValue(ENoteTableColumnAccessorKeys.NOTE_COEFFICIENT))}
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: ENoteTableColumnAccessorKeys.NOTE_COEFFICIENT,
    footer: 'Note coefficient',
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'Note coefficient'}
        menuName={'Note coefficient'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {row.getValue(ENoteTableColumnAccessorKeys.NOTE_COEFFICIENT)}
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: ENoteTableColumnAccessorKeys.NOTE_DESCRIPTION,
    footer: 'Description',
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'Description'}
        menuName={'Description'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {row.getValue(ENoteTableColumnAccessorKeys.NOTE_DESCRIPTION)}
      </div>
    ),
    enableGlobalFilter: true,
  },
  {
    id: 'actions',
    cell: ({row}) => <NoteTableRowActions row={row} />,
  },
];

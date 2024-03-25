'use client';

import { ColumnDef } from '@tanstack/react-table';
import TableColumnHeaderWithSort from '@/shared/ui/tanstackReactTable/TableColumnHeaderWithSort';
import {INote} from '@/shared/types/notes.types';
import NoteTableRowActions from '@/widgets/Notes/_ui/NoteTableRowActions';
import {parseDate} from '@/shared/utils/parceDate';

type TNotesColumns = Omit<INote, ''>;

export const notesColumns: ColumnDef<TNotesColumns>[] = [
  {
    accessorKey: 'noteId',
    header: () => <div className="font-bold text-start whitespace-nowrap">Note ID</div>,
    cell: ({row}) => <div className="text-start">{row.getValue('noteId')}</div>,
  },
  {
    accessorKey: 'categoryId',
    header: ({column}) =>
      <TableColumnHeaderWithSort columnName={'Note category'} menuName={'Note sorting'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('categoryId')}</div>,
  },
  {
    accessorKey: 'endCalculationDate',
    header: ({column}) =>
      <TableColumnHeaderWithSort columnName={'End calculation date'} menuName={'End calculation date'} column={column}/>,
    cell: ({row}) => <div className="text-start">
      {parseDate(row.getValue('endCalculationDate'))}
    </div>,
  },
  {
    accessorKey: 'noteValue',
    header: ({column}) =>
      <TableColumnHeaderWithSort columnName={'Value'} menuName={'Value'} column={column}/>,
    cell: ({row}) => <div className="text-start">
      {Number(row.getValue('noteValue')) * Number(row.getValue('noteCoefficient'))}
    </div>,
  },
  {
    accessorKey: 'noteCoefficient',
    header: ({column}) =>
      <TableColumnHeaderWithSort columnName={'Note coefficient'} menuName={'Note coefficient'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('noteCoefficient')}</div>,
  },
  {
    accessorKey: 'noteDescription',
    header: ({column}) =>
      <TableColumnHeaderWithSort columnName={'Description'} menuName={'Description'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('noteDescription')}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <NoteTableRowActions row={row}/>,
  },
];

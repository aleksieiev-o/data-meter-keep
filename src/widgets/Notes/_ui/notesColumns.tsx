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
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Note category'} menuName={'Note sorting'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('categoryId')}</div>,
  },
  {
    accessorKey: 'endCalculationDate',
    header: () => <div className="font-bold text-start whitespace-nowrap">End calculation date</div>,
    cell: ({row}) => <div className="text-start">
      {parseDate(row.getValue('endCalculationDate'))}
    </div>,
  },
  {
    accessorKey: 'noteValue',
    header: () => <div className="font-bold text-start whitespace-nowrap">Value</div>,
    cell: ({row}) => <div className="text-start">
      {Number(row.getValue('noteValue')) * Number(row.getValue('noteCoefficient'))}
    </div>,
  },
  {
    accessorKey: 'noteCoefficient',
    header: () => <div className="font-bold text-start whitespace-nowrap">Note coefficient</div>,
    cell: ({row}) => <div className="text-start">{row.getValue('noteCoefficient')}</div>,
  },
  {
    accessorKey: 'noteDescription',
    header: () => <div className="font-bold text-start whitespace-nowrap">Description</div>,
    cell: ({row}) => <div className="text-start">{row.getValue('noteDescription')}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <NoteTableRowActions row={row}/>,
  },
];

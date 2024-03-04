'use client';

import { ColumnDef } from '@tanstack/react-table';
import TableColumnHeaderWithSort from '@/shared/ui/tanstackReactTable/TableColumnHeaderWithSort';
import TableRowActionDropdown from '@/shared/ui/tanstackReactTable/TableRowAction.dropdown';

// interface INote {
//   noteId: string;
//   categoryId: string;
//   value: number;
//   description: string;
//   endCalculationDate: string;
//   coefficient: number;
// }

export interface ICategory {
  categoryId: string;
  name: string;
}

export const categoriesColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'categoryId',
    header: () => <div className="font-bold text-start">Category ID</div>,
    cell: ({row}) => <div className="text-start">{row.getValue('categoryId')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Category name'} menuName={'Category sorting'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <TableRowActionDropdown row={row}/>,
  },
];

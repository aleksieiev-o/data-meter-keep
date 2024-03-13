'use client';

import { ColumnDef } from '@tanstack/react-table';
import TableColumnHeaderWithSort from '@/shared/ui/tanstackReactTable/TableColumnHeaderWithSort';
import CategoryTableRowActions from '@/widgets/Categories/_ui/CategoryTableRowActions';
import {ICategory} from '@/shared/types/categories.types';

type TCategoriesColumns = Omit<ICategory, ''>;

export const categoriesColumns: ColumnDef<TCategoriesColumns>[] = [
  {
    accessorKey: 'categoryId',
    header: () => <div className="font-bold text-start whitespace-nowrap">Category ID</div>,
    cell: ({row}) => <div className="text-start">{row.getValue('categoryId')}</div>,
  },
  {
    accessorKey: 'categoryName',
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Category name'} menuName={'Category sorting'} column={column}/>,
    cell: ({row}) => <div className="text-start">{row.getValue('categoryName')}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <CategoryTableRowActions row={row}/>,
  },
];

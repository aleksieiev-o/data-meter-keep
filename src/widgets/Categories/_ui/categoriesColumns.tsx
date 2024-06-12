'use client';

import {ColumnDef} from '@tanstack/react-table';
import TableColumnHeaderWithSort from '@/shared/ui/tanstackReactTable/TableColumnHeaderWithSort';
import CategoryTableRowActions from '@/widgets/Categories/_ui/CategoryTableRowActions';
import {ICategory} from '@/shared/types/categories.types';

type TColumns = Omit<ICategory, ''>;

enum ECategoryTableColumnAccessorKeys {
  CATEGORY_ID = 'categoryId',
  CATEGORY_NAME = 'categoryName',
}

export const categoriesColumns: ColumnDef<TColumns>[] = [
  {
    accessorKey: ECategoryTableColumnAccessorKeys.CATEGORY_ID,
    header: () => (
      <div className="whitespace-nowrap text-start font-bold">Category ID</div>
    ),
    cell: ({row}) => (
      <div className="w-[70px] overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(ECategoryTableColumnAccessorKeys.CATEGORY_ID)}
      </div>
    ),
  },
  {
    accessorKey: ECategoryTableColumnAccessorKeys.CATEGORY_NAME,
    header: ({column}) => (
      <TableColumnHeaderWithSort
        columnName={'Category name'}
        menuName={'Category sorting'}
        column={column}
      />
    ),
    cell: ({row}) => (
      <div className="text-start">
        {row.getValue(ECategoryTableColumnAccessorKeys.CATEGORY_NAME)}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({row}) => <CategoryTableRowActions row={row} />,
  },
];

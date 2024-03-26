import {FC, ReactElement} from 'react';
import {TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {flexRender} from '@tanstack/react-table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

const AppTableHeader: FC<ITableRowData> = (props): ReactElement => {
  const {table} = props;

  return (
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
  );
};

export default AppTableHeader;

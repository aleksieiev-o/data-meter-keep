import {FC, ReactElement} from 'react';
import {ColumnDef, flexRender} from '@tanstack/react-table';
import {TableBody, TableCell, TableRow} from '@/components/ui/table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

interface Props<TData, TValue> extends ITableRowData {
  columns: ColumnDef<TData, TValue>[];
}

const AppTableBody: FC = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {table, columns} = props;

  return (
    <TableBody>
      {
        table.getRowModel()?.rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results
            </TableCell>
          </TableRow>
        )
      }
    </TableBody>
  );
};

export default AppTableBody;

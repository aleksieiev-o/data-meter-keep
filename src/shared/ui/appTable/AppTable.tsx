import {FC, ReactElement} from 'react';
import {Table} from '@/components/ui/table';
import AppTableHeader from '@/shared/ui/appTable/_ui/AppTableHeader';
import AppTableBody from '@/shared/ui/appTable/_ui/AppTableBody';
import {Skeleton} from '@/components/ui/skeleton';
import {ColumnDef} from '@tanstack/react-table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

interface Props<TData, TValue> extends ITableRowData {
  columns: ColumnDef<TData, TValue>[];
  isPending: boolean;
}

const AppTable: FC = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {table, columns, isPending} = props;

  return (
    <div className="rounded-md border">
      {
        !isPending ?
          <Table>
            <AppTableHeader table={table}/>

            <AppTableBody table={table} columns={columns}/>
          </Table>
          :
          <Skeleton className={'h-[144px] w-full rounded-md border'}/>
      }
    </div>
  );
};

export default AppTable;

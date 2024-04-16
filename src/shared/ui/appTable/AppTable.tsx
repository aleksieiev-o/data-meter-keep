import {ReactElement} from 'react';
import {Table} from '@/components/ui/table';
import AppTableHeader from '@/shared/ui/appTable/_ui/AppTableHeader';
import AppTableBody from '@/shared/ui/appTable/_ui/AppTableBody';
import {Skeleton} from '@/components/ui/skeleton';
import {ColumnDef} from '@tanstack/react-table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

interface Props<TData, TValue> extends ITableRowData<TData> {
  columns: ColumnDef<TData, TValue>[];
  isPending: boolean;
}

const AppTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const {table, columns, isPending} = props;

  return (
    <div className="rounded-md border">
      {
        isPending ?
          <Skeleton className={'h-[300px] w-full rounded-md border'}/>
          :
          <Table>
            <AppTableHeader table={table}/>

            <AppTableBody table={table} columns={columns}/>
          </Table>
      }
    </div>
  );
};

export default AppTable;

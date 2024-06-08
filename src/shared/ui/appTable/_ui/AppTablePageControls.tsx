import {ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

const AppTablePageControls = <TData,>(
  props: ITableRowData<TData>,
): ReactElement => {
  const {table} = props;

  return (
    <div className="mt-auto flex items-center justify-end gap-6">
      <Button
        onClick={() => table.previousPage()}
        variant={'default'}
        title={'Previous page'}
        disabled={!table.getCanPreviousPage()}
        className="sm:w-[200px]"
      >
        <ChevronLeft />

        <span className={'ml-2 hidden sm:inline'}>Previous page</span>
      </Button>

      <Button
        onClick={() => table.nextPage()}
        variant={'default'}
        title={'Next page'}
        disabled={!table.getCanNextPage()}
        className="sm:w-[200px]"
      >
        <span className={'mr-2 hidden sm:inline'}>Next page</span>

        <ChevronRight />
      </Button>
    </div>
  );
};

export default AppTablePageControls;

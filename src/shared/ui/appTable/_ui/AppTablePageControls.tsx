import {ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

const AppTablePageControls = <TData, >(props: ITableRowData<TData>): ReactElement => {
  const {table} = props;

  return (
    <div className="flex items-center justify-end gap-6 mt-auto">
      <Button
        onClick={() => table.previousPage()}
        variant={'default'}
        title={'Previous page'}
        disabled={!table.getCanPreviousPage()}
        className='sm:w-[200px]'>
        <ChevronLeft/>

        <span className={'sm:inline hidden ml-2'}>
          Previous page
        </span>
      </Button>

      <Button
        onClick={() => table.nextPage()}
        variant={'default'}
        title={'Next page'}
        disabled={!table.getCanNextPage()}
        className='sm:w-[200px]'>
        <span className={'sm:inline hidden mr-2'}>
          Next page
        </span>

        <ChevronRight/>
      </Button>
    </div>
  );
};

export default AppTablePageControls;

import {ReactElement} from 'react';
import {ENoteTableColumnAccessorKeys} from '@/widgets/Notes/_ui/notesColumns';
import {SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {Select, SelectValue} from '@radix-ui/react-select';
import {flexRender} from '@tanstack/react-table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

interface Props<TData> extends ITableRowData<TData> {
  setFilteredColumn: (value: ENoteTableColumnAccessorKeys) => void;
}

const AppTableNoteFilterSelect = <TData, >(props: Props<TData>): ReactElement => {
  const {table, setFilteredColumn} = props;

  return (
    <Select
      onValueChange={(value) => setFilteredColumn(value as ENoteTableColumnAccessorKeys)}
      defaultValue={ENoteTableColumnAccessorKeys.CATEGORY_NAME}>
      <SelectTrigger className='w-full sm:w-[200px]'>
        <SelectValue placeholder={'Set a filtered column'} title={'Set a filtered column'}/>
      </SelectTrigger>

      {/* TODO add to filtered columns another number notes-table fields */}
      <SelectContent>
        {
          table.getHeaderGroups().map((headerGroup) => (
            headerGroup.headers
              .filter((header) =>
                header.id === ENoteTableColumnAccessorKeys.CATEGORY_NAME
                || header.id === ENoteTableColumnAccessorKeys.NOTE_DESCRIPTION)
              .map((header) => (
                <SelectItem
                  key={header.id}
                  value={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </SelectItem>
              ))
          ))
        }
      </SelectContent>
    </Select>
  );
};

export default AppTableNoteFilterSelect;

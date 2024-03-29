import {FC, ReactElement} from 'react';
import {ENoteTableColumnAccessorKeys} from '@/widgets/Notes/_ui/notesColumns';
import {SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {Select, SelectValue} from '@radix-ui/react-select';
import {flexRender} from '@tanstack/react-table';
import {ITableRowData} from '@/shared/ui/appTable/_types/TableRowData.interface';

interface Props extends ITableRowData {
  setFilteredColumn: (value: ENoteTableColumnAccessorKeys) => void;
}

const AppTableNoteFilterSelect: FC<Props> = (props): ReactElement => {
  const {table, setFilteredColumn} = props;

  return (
    <Select
      onValueChange={(value) => setFilteredColumn(value as ENoteTableColumnAccessorKeys)}
      defaultValue={ENoteTableColumnAccessorKeys.CATEGORY_ID}>
      <SelectTrigger className={'w-[180px]'}>
        <SelectValue placeholder={'Set a filtered column'} title={'Set a filtered column'}/>
      </SelectTrigger>

      {/* TODO add to filtered columns another number notes-table fields */}
      <SelectContent>
        {
          table.getHeaderGroups().map((headerGroup) => (
            headerGroup.headers
              .filter((header) =>
                header.id === ENoteTableColumnAccessorKeys.CATEGORY_ID
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

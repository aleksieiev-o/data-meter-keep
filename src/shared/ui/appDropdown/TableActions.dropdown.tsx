import {FC, ReactElement} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {MoreHorizontal, Pencil, Trash} from 'lucide-react';

interface Props {
  handlePrepareUpdate: () => void;
  handlePrepareDelete: () => void;
}

const TableActionsDropdown: FC<Props> = (props): ReactElement => {
  const {handlePrepareUpdate, handlePrepareDelete} = props;

  return (
    <div className={'flex w-full justify-end'}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" title={'Open menu'}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={handlePrepareUpdate}
            className={'flex flex-row items-center justify-start gap-4'}
          >
            <Pencil className={'h-4 w-4'} />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handlePrepareDelete}
            className={'flex flex-row items-center justify-start gap-4'}
          >
            <Trash className={'h-4 w-4'} />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableActionsDropdown;

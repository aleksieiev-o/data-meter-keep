'use client';

import {ReactElement, useState} from 'react';
import {Row} from '@tanstack/react-table';
import RemoveConfirmCategoryDialog from '@/features/categories/RemoveConfirmCategory.dialog';
import {ICategory} from '@/shared/types/categories.types';
import UpdateCategoryDialog from '@/features/categories/UpdateCategory.dialog';
import TableActionsDropdown from '@/shared/ui/TableActions.dropdown';

interface Props<TData> {
  row: Row<TData>;
}

const CategoryTableRowActions = <TData,>(props: Props<TData>): ReactElement => {
  const {row} = props;
  const rowOriginal = row.original;
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [dialogUpdateIsOpen, setDialogUpdateIsOpen] = useState<boolean>(false);

  const handlePrepareUpdate = () => {
    setDialogUpdateIsOpen(true);
  };

  const handlePrepareDelete = () => {
    setDialogRemoveIsOpen(true);
  };

  return (
    <>
      <TableActionsDropdown
        handlePrepareUpdate={handlePrepareUpdate}
        handlePrepareDelete={handlePrepareDelete}/>

      <UpdateCategoryDialog
        setDialogIsOpen={setDialogUpdateIsOpen}
        dialogIsOpen={dialogUpdateIsOpen}
        category={rowOriginal as ICategory}/>

      <RemoveConfirmCategoryDialog
        setDialogIsOpen={setDialogRemoveIsOpen}
        dialogIsOpen={dialogRemoveIsOpen}
        category={rowOriginal as ICategory}/>
    </>
  );
};

export default CategoryTableRowActions;

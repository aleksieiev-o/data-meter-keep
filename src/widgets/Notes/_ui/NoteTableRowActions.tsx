'use client';

import {ReactElement, useState} from 'react';
import {Row} from '@tanstack/table-core/build/lib/types';
import TableActionsDropdown from '@/shared/ui/TableActions.dropdown';
import {INote} from '@/shared/types/notes.types';
import RemoveConfirmNoteDialog from '@/features/notes/RemoveConfirmNote.dialog';

interface Props<TData> {
  row: Row<TData>;
}

const NoteTableRowActions = <TData,>(props: Props<TData>): ReactElement => {
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

      {/*<UpdateNoteDialog*/}
      {/*  setDialogIsOpen={setDialogUpdateIsOpen}*/}
      {/*  dialogIsOpen={dialogUpdateIsOpen}*/}
      {/*  note={rowOriginal as INote}/>*/}

      <RemoveConfirmNoteDialog
        setDialogIsOpen={setDialogRemoveIsOpen}
        dialogIsOpen={dialogRemoveIsOpen}
        note={rowOriginal as INote}/>
    </>
  );
};

export default NoteTableRowActions;

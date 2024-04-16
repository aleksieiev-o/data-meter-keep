'use client';

import {ReactElement, useState} from 'react';
import {Row} from '@tanstack/react-table';
import TableActionsDropdown from '@/shared/ui/appDropdown/TableActions.dropdown';
import {INote} from '@/shared/types/notes.types';
import RemoveConfirmNoteDialog from '@/features/notes/RemoveConfirmNote.dialog';
import {useRouter} from 'next/navigation';
import {RoutePath} from '@/shared/router/Routes.enum';
import { ENoteTableColumnAccessorKeys } from './notesColumns';

interface Props<TData> {
  row: Row<TData>;
}

const NoteTableRowActions = <TData,>(props: Props<TData>): ReactElement => {
  const {row} = props;
  const rowOriginal = row.original;
  const {push} = useRouter();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

  const handlePrepareUpdate = () => {
    push(RoutePath.UPDATE_NOTE.replace('[id]', row.getValue(ENoteTableColumnAccessorKeys.NOTE_ID)));
  };

  const handlePrepareDelete = () => {
    setDialogRemoveIsOpen(true);
  };

  return (
    <>
      <TableActionsDropdown
        handlePrepareUpdate={handlePrepareUpdate}
        handlePrepareDelete={handlePrepareDelete}/>

      <RemoveConfirmNoteDialog
        setDialogIsOpen={setDialogRemoveIsOpen}
        dialogIsOpen={dialogRemoveIsOpen}
        note={rowOriginal as INote}/>
    </>
  );
};

export default NoteTableRowActions;

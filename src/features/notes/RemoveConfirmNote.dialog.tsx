import {FC, ReactElement} from 'react';
import {INote} from '@/shared/types/notes.types';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {removeNote} from '@/entities/notes/notes.service';
import RemoveConfirmDialog from '@/shared/ui/RemoveConfirm.dialog';

interface Props {
  note: INote;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveConfirmNoteDialog: FC<Props> = (props): ReactElement => {
  const {note, dialogIsOpen, setDialogIsOpen} = props;
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.NOTE_LIST],
    });

    toast({
      title: 'Success',
      description: 'The note has successfully removed.',
    });
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({
      title: 'Failure',
      description: 'An error has occurred. Something went wrong.',
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
    setDialogIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async (id: string) => await removeNote(id),
    onSuccess: async (data, variables, context) => {
      await onSuccessCallback();
    },
    onError: async (error, variables) => {
      await onErrorCallback();
      console.warn(error, variables);
    },
    onSettled: async (data, error, variables, context) => {
      await onSettledCallback();
    },
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutation.mutate(note.noteId);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove note confirmation'}
      dialogDescription={'You are about to remove this note.'}
      dialogQuestion={'Are you sure you want to delete this note?'}
      btnTitle={'Remove note'}
      btnBody={'Remove'}/>
  );
};

export default RemoveConfirmNoteDialog;

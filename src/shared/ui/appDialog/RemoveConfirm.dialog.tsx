import {FC, ReactElement} from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

interface Props {
  isLoading: boolean;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  handleConfirm: () => void;
  dialogTitle: string;
  dialogDescription: string;
  dialogQuestion: string;
  btnTitle: string;
  btnBody: string;
}

const RemoveConfirmDialog: FC<Props> = (props): ReactElement => {
  const {
    isLoading,
    dialogIsOpen,
    setDialogIsOpen,
    handleConfirm,
    dialogDescription,
    dialogQuestion,
    dialogTitle,
    btnTitle,
    btnBody,
  } = props;

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>

          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <p>{dialogQuestion}</p>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            variant={'destructive'}
            title={btnTitle}
          >
            {btnBody}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveConfirmDialog;

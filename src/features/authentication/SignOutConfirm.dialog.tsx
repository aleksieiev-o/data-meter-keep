'use client';

import {FC, ReactElement, useContext} from 'react';
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
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/navigation';
import {RoutePath} from '@/shared/router/Routes.enum';
import {signOutAdmin} from '@/shared/api/signOutAdmin';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import CloseButton from '@/shared/ui/appButton/Close.button';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const SignOutConfirmDialog: FC<Props> = (props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen} = props;
  const {signOut, signOutLoading} = useContext(AppAuthContext);
  const {toast} = useToast();
  const {replace} = useRouter();

  const handleConfirm = async (): Promise<void> => {
    try {
      await signOut();
      await signOutAdmin();

      toast({title: 'Success', description: 'You signed out successfully.'});

      replace(RoutePath.SIGN_IN);
    } catch (e) {
      toast({
        title: 'Failure',
        description: 'An error has occurred. Something went wrong.',
        variant: 'destructive',
      });
      console.warn(e);
    } finally {
      setDialogIsOpen(false);
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Sign out confirmation</DialogTitle>

          <DialogDescription>You are about to sign out.</DialogDescription>
        </DialogHeader>

        <p>Are you sure you want to sign out?</p>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={signOutLoading}
            variant={'destructive'}
            title={'Sign out'}
          >
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutConfirmDialog;

'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/navigation';
import {FC, ReactElement, useContext} from 'react';
import {signOutAdmin} from '@/shared/api/signOutAdmin';
import {RoutePath} from '@/shared/router/Routes.enum';
import {Send} from 'lucide-react';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const ChangePasswordDialog: FC<Props> = (props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {
    user,
    signOut,
    signOutLoading,
    sendPasswordResetEmail,
    sendPasswordResetEmailLoading,
  } = useContext(AppAuthContext);
  const {replace} = useRouter();

  const handleSendRequest = async () => {
    try {
      await sendPasswordResetEmail(user?.email || '', undefined);

      toast({
        title: 'Re-authentication is required',
        description:
          'Please check your email and click on the link to change your password. After changing your password, you will need to re-authenticate.',
        action: (
          <Button
            onClick={handleSignOut}
            disabled={signOutLoading}
            variant={'destructive'}
            title={'Sign out'}
          >
            Sign out
          </Button>
        ),
      });
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

  const handleSignOut = async (): Promise<void> => {
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
          <DialogTitle>Change password</DialogTitle>

          <DialogDescription>
            You are about to change your password.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col items-start justify-start gap-2 text-sm text-muted-foreground">
          <p>
            You will be prompted to change your password using your email
            address.
          </p>
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Button
            onClick={handleSendRequest}
            disabled={sendPasswordResetEmailLoading}
            variant={'default'}
            title={'Send request'}
          >
            <Send className={'mr-4 h-5 w-5'} />

            <p>Send request</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;

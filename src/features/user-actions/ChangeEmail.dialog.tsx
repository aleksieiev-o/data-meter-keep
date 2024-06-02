'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { firebaseAuth } from '@/lib/firebase/firebase';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {FC, ReactElement, useId, useMemo, useState} from 'react';
import { useAuthState, useSignOut, useVerifyBeforeUpdateEmail } from 'react-firebase-hooks/auth';
import {signOutAdmin} from '@/shared/api/signOutAdmin';
import { useForm } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';
import { RoutePath } from '@/shared/router/Routes.enum';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const ChangeEmailDialog: FC<Props> = (props): ReactElement => {
	const formID = useId();
	const {dialogIsOpen, setDialogIsOpen} = props;
	const { toast } = useToast();
	const [user] = useAuthState(firebaseAuth);
	const [signOut, signOutLoading] = useSignOut(firebaseAuth);
  const {replace} = useRouter();
	const [verifyBeforeUpdateEmail, verifyBeforeUpdateEmailLoading] = useVerifyBeforeUpdateEmail(firebaseAuth);
  const [additionalInfo, setAdditionalInfo] = useState<boolean>(false);

  const isUserNeedsReAuth = () => {
    const currentDate = new Date();
    const lastSignInDate = new Date(user?.metadata.lastSignInTime || '');

    const datesDiff = currentDate.getTime() - lastSignInDate.getTime();

    return datesDiff >= 300000; // 5 minutes
  };

	const emailSchema = useMemo(() => (z.
    object({
      email: z.string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
        .trim()
				.email({message: 'Email value must be a valid email'})
        .min(3, 'Email length must be at least 3 characters')
        .max(254, 'Email length must not exceed 254 characters'),
			})
			.superRefine((data, ctx) => {
				if (data.email === user?.email || data.email === '') {
					ctx.addIssue({
						code: ZodIssueCode.custom,
						path: ['email'],
						message: 'The old and new emails are the same',
					});
				}
			})
  ), [user?.email]);

	const formModel = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });

	const handleSubmitForm = async (values: z.infer<typeof emailSchema>) => {
    try {
			await verifyBeforeUpdateEmail(values.email, null);
      const isNeedReAuth = isUserNeedsReAuth();

      if (isNeedReAuth) {
        setAdditionalInfo(true);
      } else {
        toast({
          title: 'Re-authentication is required',
          description: 'Please check your email to verify your updated email address. After verifying the new email, you will need to re-authenticate.',
          action: <Button
              onClick={handleSignOut}
              disabled={signOutLoading}
              variant={'destructive'}
              title={'Sign out'}>
              Sign out
            </Button>,
        });

        setDialogIsOpen(false);
      }
    } catch (e) {
      toast({title: 'Failure', description: 'An error has occurred. Something went wrong.', variant: 'destructive'});
      console.warn(e);

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
      toast({title: 'Failure', description: 'An error has occurred. Something went wrong.', variant: 'destructive'});
      console.warn(e);
    } finally {
      setDialogIsOpen(false);
    }
  };

	return (
		<Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>
						Change email
					</DialogTitle>

          <DialogDescription>
            You are about to change your email.
          </DialogDescription>
        </DialogHeader>

				<div className={'w-full h-full flex flex-col items-center justify-center gap-6'}>
					<div className='w-full flex flex-col items-start justify-start gap-2 overflow-hidden'>
						<p>
							Your current email is
						</p>

						<span
							title={user?.email || ''}
							className='w-full font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
							{user?.email || ''}
						</span>
					</div>

          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={formID}
              className={'w-full flex flex-col items-start justify-center gap-4'}>
              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'email'}
                label={'Email'}
                placeholder={'New email...'}
                required={true}
                disabled={verifyBeforeUpdateEmailLoading}
                isDataPending={false}/>
            </form>
          </Form>

          {
            additionalInfo &&
            <div className='w-full flex flex-col items-start justify-start gap-2 text-sm text-muted-foreground'>
              <p>
                In order to change your email, you will need to re-authenticate. This process is necessary for security reasons.
              </p>

              <p>
                After re-authenticating within 5 minutes, you will be able to change your email.
              </p>
            </div>
          }
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

					{
            additionalInfo ?
            <Button
              onClick={handleSignOut}
              disabled={signOutLoading}
              variant={'destructive'}
              title={'Sign out'}>
              Sign out
            </Button>
            :
            <SubmitButton
              formId={formID}
              title={'Change email'}
              btnBody={'Update'}
              isLoading={verifyBeforeUpdateEmailLoading}
              disabled={false}/>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default ChangeEmailDialog;

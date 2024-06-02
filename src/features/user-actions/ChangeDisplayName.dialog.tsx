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
import { DEFAULT_USER_DN } from '@/shared/appConstants';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import { zodResolver } from '@hookform/resolvers/zod';
import {FC, ReactElement, useId, useMemo} from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const ChangeDisplayNameDialog: FC<Props> = (props): ReactElement => {
	const formID = useId();
	const {dialogIsOpen, setDialogIsOpen} = props;
	const { toast } = useToast();
	const [user] = useAuthState(firebaseAuth);
	const [updateProfile, updateProfileLoading] = useUpdateProfile(firebaseAuth);

	const displayNameSchema = useMemo(() => (z.
    object({
      displayName: z.string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
        .trim()
        .min(3, 'Display name length must be at least 3 characters')
        .max(20, 'Display name length must not exceed 20 characters'),
    })
    .superRefine((data, ctx) => {
      if (data.displayName === user?.displayName || data.displayName === DEFAULT_USER_DN) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          path: ['displayName'],
          message: 'The old and new display names are the same',
        });
      }
    })
  ), [user?.displayName]);

	const formModel = useForm<z.infer<typeof displayNameSchema>>({
    resolver: zodResolver(displayNameSchema),
  });

	const handleSubmitForm = async (values: z.infer<typeof displayNameSchema>) => {
    try {
			await updateProfile({displayName: values.displayName});

      toast({title: 'Success', description: 'Your display name changed successfully.'});
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
						Change display name
					</DialogTitle>

          <DialogDescription>
            You are about to change your display name.
          </DialogDescription>
        </DialogHeader>

				<div className={'w-full h-full flex flex-col items-center justify-center gap-6'}>
					<div className='w-full flex flex-col items-start justify-start gap-2 overflow-hidden'>
						<p>
							Your current display name is
						</p>

						<span
							title={user?.displayName || DEFAULT_USER_DN}
							className='w-full font-bold whitespace-nowrap text-ellipsis overflow-hidden'>
							{user?.displayName || DEFAULT_USER_DN}
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
                name={'displayName'}
                label={'Display name'}
                placeholder={'New display name...'}
                required={true}
                disabled={updateProfileLoading}
                isDataPending={false}/>
            </form>
          </Form>
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

					<SubmitButton
            formId={formID}
            title={'Change display name'}
            btnBody={'Update'}
            isLoading={updateProfileLoading}
            disabled={false}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default ChangeDisplayNameDialog;

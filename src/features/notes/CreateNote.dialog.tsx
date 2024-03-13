'use client';

import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {object, string, z, ZodRawShape, ZodString} from 'zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {Form} from '@/components/ui/form';
import FormFieldText from '@/shared/ui/FormField/FormField.text';
import SubmitButton from '@/shared/ui/Submit.button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RoutePath} from '@/shared/router/Routes.enum';
import {createNote} from '@/entities/notes/notes.service';

interface Props {
  CreateNoteDialog: string;
}

interface INoteShape extends ZodRawShape {
  noteValue: ZodString;
  endCalculationDate: ZodString;
  noteDescription: ZodString;
  noteCoefficient: ZodString;
  categoryId: ZodString;
}

const CreateNoteDialog: FC<Props> = (props): ReactElement => {
  const formID = useId();
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const shape = useMemo<INoteShape>(() => ({
    noteValue: string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
      .trim()
      .min(3, 'Category name length must be at least 3 characters')
      .max(180, 'Category name length must not exceed 180 characters'),
  }), []);

  const formSchema = useMemo(() => {
    return object<INoteShape>(shape);
  }, [shape]);

  const formModel = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noteValue: '',
      endCalculationDate: '',
      noteDescription: '',
      noteCoefficient: '',
      categoryId: '',
    },
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.NOTE_LIST],
    });

    toast({title: 'Success', description: 'You have successfully created a new note.'});

    formModel.reset();
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({title: 'Failure', description: 'An error has occurred. Something went wrong.', variant: 'destructive'});
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
    setDialogIsOpen(false);
  };

  const mutationCreate = useMutation({
    mutationFn: (values) => createNote({categoryName: values.categoryName}),
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

  const handleSubmitForm = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    mutationCreate.mutate(values);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} title={'Create note'}>
          <Plus/>

          <span className={'ml-2'}>
            Create note
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Create new note</DialogTitle>

          <DialogDescription>
            The note contains data and belongs to one of the categories.
          </DialogDescription>
        </DialogHeader>

        <div className={'w-full h-full flex flex-col items-center justify-center gap-6'}>
          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={formID}
              className={'w-full flex flex-col items-start justify-center gap-4'}>
              <FormFieldText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'noteValue'}
                label={'Note value'}
                placeholder={'100'}
                required={true}
                disabled={isLoading}/>
            </form>
          </Form>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant={'ghost'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <SubmitButton
            formId={formID}
            title={'Create'}
            btnBody={'Create'}
            isLoading={isLoading}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;

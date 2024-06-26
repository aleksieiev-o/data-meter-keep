'use client';

import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {Form} from '@/components/ui/form';
import {Plus, X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCategory} from '@/entities/categories/categories.service';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {TCreateCategoryDto} from '@/shared/types/categories.types';

const CreateCategoryDialog: FC = (): ReactElement => {
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const categorySchema = useMemo(
    () =>
      z.object({
        categoryName: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(3, 'Category name length must be at least 3 characters')
          .max(180, 'Category name length must not exceed 180 characters'),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.CATEGORY_LIST],
    });

    toast({
      title: 'Success',
      description: 'You have successfully created a new category.',
    });

    formModel.reset();
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

  const mutationCreate = useMutation({
    mutationFn: async (values: TCreateCategoryDto) =>
      await createCategory({categoryName: values.categoryName}),
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

  const handleSubmitForm = (values: z.infer<typeof categorySchema>) => {
    setIsLoading(true);
    mutationCreate.mutate(values);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'default'}
          title={'Create category'}
          className="w-[200px]"
        >
          <Plus />

          <span className={'ml-2'}>Create category</span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>

          <DialogDescription>
            Category is used to differentiate notes. Category name cannot be
            repeated.
          </DialogDescription>
        </DialogHeader>

        <div
          className={
            'flex h-full w-full flex-col items-center justify-center gap-6'
          }
        >
          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={formID}
              className={
                'flex w-full flex-col items-start justify-center gap-4'
              }
            >
              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'categoryName'}
                label={'Category name'}
                placeholder={'New category...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />
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
            title={'Create'}
            btnBody={'Create'}
            isLoading={isLoading}
            disabled={false}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;

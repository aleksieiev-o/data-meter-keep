'use client';

import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {Form} from '@/components/ui/form';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import FormFieldText from '@/shared/ui/FormField/FormField.text';
import SubmitButton from '@/shared/ui/Submit.button';
import {object, string, z, ZodRawShape, ZodString} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createCategory} from '@/entities/categories/categories.service';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';

interface ICategoryShape extends ZodRawShape {
  categoryName: ZodString;
}

const CreateCategoryDialog: FC = (): ReactElement => {
  const categoryCreateFormID = useId();
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const shape = useMemo<ICategoryShape>(() => ({
    categoryName: string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
      .trim()
      .min(3, 'Category name length must be at least 3 characters')
      .max(180, 'Category name length must not exceed 180 characters'),
  }), []);

  const formSchema = useMemo(() => {
    return object<ICategoryShape>(shape);
  }, [shape]);

  const formModel = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: '',
    },
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.CATEGORY_LIST],
    });

    toast({
      title: 'Success',
      description: 'You have successfully created a new categories.',
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
    mutationFn: (values) => createCategory({categoryName: values.categoryName}),
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
        <Button variant={'default'} title={'Create categories'}>
          <Plus/>

          <span className={'ml-2'}>
            Create category
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>

          <DialogDescription>
            Category is used to differentiate notes.
            Category name cannot be repeated.
          </DialogDescription>
        </DialogHeader>

        <div className={'w-full h-full flex flex-col items-center justify-center gap-6'}>
          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={categoryCreateFormID}
              className={'w-full flex flex-col items-start justify-center gap-4'}>
              <FormFieldText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'categoryName'}
                label={'Category name'}
                placeholder={'New categories'}
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
            formId={categoryCreateFormID}
            title={'Create'}
            btnBody={'Create'}
            isLoading={isLoading}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;

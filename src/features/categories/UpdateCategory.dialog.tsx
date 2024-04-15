'use client';

import {FC, ReactElement, useEffect, useId, useMemo} from 'react';
import {ICategory, TCreateCategoryDto} from '@/shared/types/categories.types';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {updateCategory} from '@/entities/categories/categories.service';
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
import {Form} from '@/components/ui/form';
import FormFieldText from '@/shared/ui/formFields/formTextFields/FormField.text';
import SubmitButton from '@/shared/ui/Submit.button';
import {z, ZodIssueCode} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

interface Props {
  category: ICategory;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const UpdateCategoryDialog: FC<Props> = (props): ReactElement => {
  const formID = useId();
  const {category, dialogIsOpen, setDialogIsOpen} = props;
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const categorySchema = useMemo(() => (z.
    object({
      categoryName: z.string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
        .trim()
        .min(3, 'Category name length must be at least 3 characters')
        .max(180, 'Category name length must not exceed 180 characters'),
    })
    .superRefine((data, ctx) => {
      if (data.categoryName === category.categoryName) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          path: ['categoryName'],
          message: 'The names of category are the same',
        });
      }
    })
  ), [category.categoryName]);

  const formModel = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    formModel.reset({categoryName: category.categoryName});
  }, [category.categoryName, formModel]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.CATEGORY_LIST],
    });

    toast({
      title: 'Success',
      description: 'The category has successfully updated.',
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

  const mutation = useMutation({
    mutationFn: async (values: TCreateCategoryDto) => await updateCategory({categoryName: values.categoryName}, category.categoryId),
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
    mutation.mutate(values);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Update category</DialogTitle>

          <DialogDescription>
            {
              `Current category name is ${category.categoryName}.`
            }
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
                name={'categoryName'}
                label={'New category name'}
                placeholder={'New category...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}/>
            </form>
          </Form>
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'ghost'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <SubmitButton
            formId={formID}
            title={'Update'}
            btnBody={'Update'}
            isLoading={isLoading}
            isDisabled={false}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;

'use client';

import {FC, ReactElement, useId, useMemo} from 'react';
import {ICategory} from '@/shared/types/categories.types';
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
import FormFieldText from '@/shared/ui/FormField/FormField.text';
import SubmitButton from '@/shared/ui/Submit.button';
import {object, string, z, ZodIssueCode, ZodRawShape, ZodString} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

interface Props {
  category: ICategory;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

interface ICategoryShape extends ZodRawShape {
  categoryName: ZodString;
}

const UpdateCategoryDialog: FC<Props> = (props): ReactElement => {
  const formID = useId();
  const {category, dialogIsOpen, setDialogIsOpen} = props;
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const shape = useMemo<ICategoryShape>(() => ({
    categoryName: string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
      .trim()
      .min(3, 'Category name length must be at least 3 characters')
      .max(180, 'Category name length must not exceed 180 characters'),
  }), []);

  const formSchema = useMemo(() => {
    return object<ICategoryShape>(shape)
      .superRefine((data, ctx) => {
        if (data.categoryName === category.categoryName) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            path: ['categoryName'],
            message: 'The names are the same',
          });
        }
      });
  }, [category.categoryName, shape]);

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
    mutationFn: (values) => updateCategory({categoryName: values.categoryName}, category.categoryId),
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
            title={'Update'}
            btnBody={'Update'}
            isLoading={isLoading}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;

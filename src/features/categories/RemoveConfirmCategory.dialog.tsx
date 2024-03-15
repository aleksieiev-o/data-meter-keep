'use client';

import {FC, ReactElement} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {ICategory} from '@/shared/types/categories.types';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {removeCategory} from '@/entities/categories/categories.service';
import {RoutePath} from '@/shared/router/Routes.enum';
import {Button} from '@/components/ui/button';

interface Props {
  category: ICategory;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveConfirmCategoryDialog: FC<Props> = (props): ReactElement => {
  const {category, dialogIsOpen, setDialogIsOpen} = props;
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.CATEGORY_LIST],
    });

    toast({
      title: 'Success',
      description: 'The category has successfully removed.',
    });
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

  const mutation = useMutation<ICategory>({
    mutationFn: (id) => removeCategory(id),
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

  const handleConfirm = () => {
    setIsLoading(true);
    mutation.mutate(category.categoryId);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Remove category confirmation</DialogTitle>

          <DialogDescription>
            You are about to remove this category.
          </DialogDescription>
        </DialogHeader>

        <p>
          Are you sure you want to delete this category?
        </p>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'ghost'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            variant={'destructive'}
            title={'Remove category'}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveConfirmCategoryDialog;

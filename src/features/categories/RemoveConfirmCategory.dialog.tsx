'use client';

import {FC, ReactElement} from 'react';
import {ICategory} from '@/shared/types/categories.types';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {removeCategory} from '@/entities/categories/categories.service';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';

interface Props {
  category: ICategory;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveConfirmCategoryDialog: FC<Props> = (props): ReactElement => {
  const {category, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
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

  const mutation = useMutation({
    mutationFn: async (id: string) => await removeCategory(id),
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
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove category confirmation'}
      dialogDescription={'You are about to remove this category.'}
      dialogQuestion={'Are you sure you want to delete this category?'}
      btnTitle={'Remove category'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveConfirmCategoryDialog;

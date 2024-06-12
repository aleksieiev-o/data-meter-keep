'use client';

import {FC, ReactElement, useContext, useEffect, useId, useMemo} from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  createNote,
  fetchNoteById,
  updateNote,
} from '@/entities/notes/notes.service';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import CreateCategoryDialog from '@/features/categories/CreateCategory.dialog';
import {Skeleton} from '@/components/ui/skeleton';
import {Popover, PopoverTrigger} from '@radix-ui/react-popover';
import {Button} from '@/components/ui/button';
import {CalendarIcon} from 'lucide-react';
import {PopoverContent} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {usePathname, useRouter} from 'next/navigation';
import {ICreateNoteDto} from '@/shared/types/notes.types';
import AppFormSelect from '@/shared/ui/appSelect/AppFormSelect';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';

interface Props {
  variant: 'create' | 'update';
}

const CreateOrUpdateNoteForm: FC<Props> = (props): ReactElement => {
  const {variant} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const {user} = useContext(AppAuthContext);
  const pathname = usePathname();
  const router = useRouter();

  const noteId = useMemo(() => pathname.split('/')[3], [pathname]);

  const {data: categoriesQueryData, isPending: categoriesIsPending} = useQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: async () => await fetchCategories(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const {data: notesQueryData, isPending: notesIsPending} = useQuery({
    queryKey: [noteId],
    queryFn: async () => await fetchNoteById(noteId),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const noteSchema = useMemo(
    () =>
      z.object({
        noteValue: z.coerce
          .number({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a number',
          })
          .nonnegative(),
        endCalculationDate: z.date({
          required_error: 'Field is required',
          invalid_type_error: 'Value must be a date',
        }),
        noteDescription: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .max(180, 'Note description length must not exceed 180 characters'),
        noteCoefficient: z.coerce
          .number({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a number',
          })
          .nonnegative(),
        categoryId: z.string({
          required_error: 'Field is required',
          invalid_type_error:
            'You need to select one of the categories or create new one',
        }),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
  });

  useEffect(() => {
    if (variant === 'create') {
      formModel.reset({
        noteCoefficient: 1,
        noteDescription: '...',
      });
    }

    if (variant === 'update' && notesQueryData) {
      formModel.reset({
        noteCoefficient: notesQueryData.noteCoefficient,
        noteDescription: notesQueryData.noteDescription,
        endCalculationDate: new Date(notesQueryData.endCalculationDate),
        noteValue: notesQueryData.noteValue,
        categoryId: notesQueryData.categoryId,
      });
    }
  }, [formModel, notesQueryData, variant]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.NOTE_LIST],
    });

    const description =
      variant === 'create'
        ? 'You have successfully created a new note.'
        : 'You have successfully updated this note.';
    toast({title: 'Success', description});

    formModel.reset();
    router.back();
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
  };

  const createNoteData = (values: ICreateNoteDto): ICreateNoteDto => ({
    noteValue: values.noteValue,
    endCalculationDate: new Date(values.endCalculationDate),
    noteDescription: values.noteDescription || '...',
    noteCoefficient: values.noteCoefficient || 1,
    categoryId: values.categoryId,
  });

  const mutationCreateOrUpdate = useMutation({
    mutationFn: async (values: ICreateNoteDto) =>
      variant === 'create'
        ? await createNote(createNoteData(values))
        : await updateNote(createNoteData(values), noteId),
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

  const handleSubmitForm = (values: z.infer<typeof noteSchema>) => {
    setIsLoading(true);
    mutationCreateOrUpdate.mutate(values);
  };

  return (
    <div
      className={
        'flex h-full w-full flex-col items-center justify-center gap-6'
      }
    >
      <Form {...formModel}>
        <form
          onSubmit={formModel.handleSubmit(handleSubmitForm)}
          id={formID}
          className={'flex w-full flex-col items-start justify-center gap-4'}
        >
          <div
            className={
              'flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:flex-nowrap sm:items-end'
            }
          >
            <AppFormSelect
              formModel={formModel}
              id="create-update-note-form-select"
              name={'categoryId'}
              label={'List of categories'}
              placeholder={'Select category'}
              required={true}
              disabled={isLoading}
              isDataPending={categoriesIsPending}
              dataList={categoriesQueryData || []}
              emptyDataListMessage={'There are no categories yet'}
            />

            <CreateCategoryDialog />
          </div>

          <FormField
            name={'endCalculationDate'}
            render={({field}) => (
              <FormItem className={'w-full'}>
                <FormLabel aria-required={true}>End calculation date</FormLabel>

                <Popover>
                  {notesIsPending ? (
                    <Skeleton className={'h-12 w-full'} />
                  ) : (
                    <PopoverTrigger asChild>
                      <FormControl aria-required={true}>
                        <Button
                          variant={'outline'}
                          disabled={isLoading}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />

                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                  )}

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          ></FormField>

          <AppFormInputText
            mode={'input'}
            type={'number'}
            formModel={formModel}
            name={'noteValue'}
            label={'Note value'}
            placeholder={'Enter a value'}
            required={true}
            disabled={isLoading}
            isDataPending={notesIsPending}
          />

          <AppFormInputText
            mode={'textarea'}
            type={'text'}
            formModel={formModel}
            name={'noteDescription'}
            label={'Note description'}
            placeholder={'Enter a description'}
            required={false}
            disabled={isLoading}
            isDataPending={notesIsPending}
          />

          <AppFormInputText
            mode={'input'}
            type={'number'}
            formModel={formModel}
            name={'noteCoefficient'}
            label={'Note coefficient'}
            placeholder={'Enter a coefficient'}
            required={true}
            disabled={isLoading}
            isDataPending={notesIsPending}
          />
        </form>
      </Form>

      <div className={'flex w-full flex-row items-center justify-end gap-4'}>
        <GoToPreviousPageButton />

        <SubmitButton
          formId={formID}
          title={variant === 'create' ? 'Create' : 'Update'}
          btnBody={variant === 'create' ? 'Create' : 'Update'}
          isLoading={isLoading}
          disabled={notesIsPending}
        />
      </div>
    </div>
  );
};

export default CreateOrUpdateNoteForm;

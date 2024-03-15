'use client';

import {FC, ReactElement, useId, useMemo} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import FormFieldText from '@/shared/ui/FormField/FormField.text';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuthState} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {ICategory} from '@/shared/types/categories.types';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import {coerce, date, object, string, z, ZodDate, ZodNumber, ZodRawShape, ZodString} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {createNote} from '@/entities/notes/notes.service';
import GoToPreviousPageButton from '@/shared/ui/GoToPreviousPage.button';
import SubmitButton from '@/shared/ui/Submit.button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import CreateCategoryDialog from '@/features/categories/CreateCategory.dialog';
import {SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {Select, SelectValue} from '@radix-ui/react-select';
import {Skeleton} from '@/components/ui/skeleton';
import {Popover, PopoverTrigger} from '@radix-ui/react-popover';
import {Button} from '@/components/ui/button';
import {CalendarIcon} from 'lucide-react';
import {PopoverContent} from '@/components/ui/popover';
import {Calendar} from '@/components/ui/calendar';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';

interface Props {
  variant: 'create' | 'update';
}

interface INoteShape extends ZodRawShape {
  noteValue: ZodNumber;
  endCalculationDate: ZodDate;
  noteDescription: ZodString;
  noteCoefficient: ZodNumber;
  categoryId: ZodString;
}

const CreateNoteForm: FC<Props> = (props): ReactElement => {
  const {variant} = props;
  const formID = useId();
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const [user] = useAuthState(firebaseAuth);

  const { data: queryCategoriesListData, isPending: isPendingCategoriesList } = useQuery<ICategory>({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: () => fetchCategories(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const shape = useMemo<INoteShape>(() => ({
    noteValue: coerce.number({ required_error: 'Field is required', invalid_type_error: 'Value must be a number' })
      .nonnegative(),
    endCalculationDate: date({ required_error: 'Field is required', invalid_type_error: 'Value must be a date' }),
    noteDescription: string({ invalid_type_error: 'Value must be a string' })
      .trim()
      .max(180, 'Note description length must not exceed 180 characters'),
    noteCoefficient: coerce.number({ required_error: 'Field is required', invalid_type_error: 'Value must be a number' })
      .nonnegative(),
    categoryId: string({ required_error: 'Field is required', invalid_type_error: 'You need to select one of the categories or create new one' }),
  }), []);

  const formSchema = useMemo(() => {
    return object<INoteShape>(shape);
  }, [shape]);

  const formModel = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noteCoefficient: 1,
      noteDescription: '...',
    }
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
  };

  const mutationCreate = useMutation({
    mutationFn: (values) => createNote({
      noteValue: values.noteValue,
      endCalculationDate: values.endCalculationDate.toISOString(),
      noteDescription: values.noteDescription || '...',
      noteCoefficient: values.noteCoefficient,
      categoryId: values.categoryId,
    }),
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
    <div className={'w-full h-full flex flex-col items-center justify-center gap-6'}>
      <Form {...formModel}>
        <form
          onSubmit={formModel.handleSubmit(handleSubmitForm)}
          id={formID}
          className={'w-full flex flex-col items-start justify-center gap-4'}>
          {
            queryCategoriesListData && queryCategoriesListData.length ?
              <div className={'w-full flex flex-col sm:flex-row sm:flex-nowrap items-start sm:items-end justify-between gap-4'}>
                <FormField
                  name={'categoryId'}
                  render={({field}) => (
                    <FormItem className={'w-full'}>
                      <FormLabel aria-required={true}>
                        Categories list
                      </FormLabel>

                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl aria-required={true}>
                          <SelectTrigger className={'w-full'}>
                            <SelectValue
                              placeholder={'Select category'}
                              aria-required={true}/>
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {
                            queryCategoriesListData.map((category) => (
                              <SelectItem key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}>

                </FormField>

                <CreateCategoryDialog/>
              </div>
              :
              <div className={'w-full flex flex-col sm:flex-row sm:flex-nowrap items-start sm:items-center justify-between gap-4'}>
                {
                  isPendingCategoriesList ?
                    <Skeleton className={'w-full h-12 rounded-md border'}/>
                    :
                    <p>
                      There are no categories yet.
                    </p>
                }

                <CreateCategoryDialog/>
              </div>
          }

          <FormField
            name={'endCalculationDate'}
            render={({field}) => (
              <FormItem className={'w-full'}>
                <FormLabel aria-required={true}>
                  End calculation date
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl aria-required={true}>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus/>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}>
          </FormField>

          <FormFieldText
            mode={'input'}
            type={'number'}
            formModel={formModel}
            name={'noteValue'}
            label={'Note value'}
            placeholder={'100'}
            required={true}
            disabled={isLoading}/>

          <FormFieldText
            mode={'textarea'}
            type={'text'}
            formModel={formModel}
            name={'noteDescription'}
            label={'Note description'}
            placeholder={'Description'}
            required={false}
            disabled={isLoading}/>

          <FormFieldText
            mode={'input'}
            type={'number'}
            formModel={formModel}
            name={'noteCoefficient'}
            label={'Note coefficient'}
            placeholder={'1'}
            required={true}
            disabled={isLoading}/>
        </form>
      </Form>

      <div className={'w-full flex flex-row items-center justify-end gap-4'}>
        <GoToPreviousPageButton/>

        <SubmitButton
          formId={formID}
          title={'Create'}
          btnBody={'Create'}
          isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default CreateNoteForm;

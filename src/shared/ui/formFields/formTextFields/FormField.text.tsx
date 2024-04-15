import React, {FC, ReactElement} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {IFormTextField} from '@/shared/ui/formFields/formTextFields/_types/FormTextField.interface';
import { Skeleton } from '@/components/ui/skeleton';

const FormFieldText: FC<IFormTextField> = (props): ReactElement => {
  const {mode, formModel, name, label, placeholder, required, disabled, type, isDataPending} = props;

  return (
    <FormField
      control={formModel.control}
      name={name as string}
      render={({field}) => (
        <FormItem className={'w-full'}>
          <FormLabel aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>

            <Asterisk className={'w-2.5 h-2.5 stroke-destructive self-start'}/>
          </FormLabel>

          <FormControl aria-required={required}>
            {
              mode === 'input' ?
              <>
                {
                  isDataPending ?
                  <Skeleton className={'w-full h-12'}/>
                  :
                  <Input
                    placeholder={placeholder}
                    aria-required={required}
                    type={type}
                    disabled={disabled}
                    {...field}/>
                }
              </>
              :
              <>
                {
                  isDataPending ?
                  <Skeleton className={'w-full min-h-[80px]'}/>
                  :
                  <Textarea
                    placeholder={placeholder}
                    aria-required={required}
                    disabled={disabled}
                    {...field}/>
                }
              </>
            }
          </FormControl>

          <FormMessage/>
        </FormItem>
      )}/>
  );
};

export default FormFieldText;

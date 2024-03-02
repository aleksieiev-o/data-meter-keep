import React, {FC, ReactElement} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {IAppFormFieldProps} from '@/components/ui/custom-ui/AppFormFields/types';

const AppFormFieldText: FC<IAppFormFieldProps> = (props): ReactElement => {
  const {mode, formModel, name, label, placeholder, required, disabled} = props;

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
              <Input
                placeholder={placeholder}
                aria-required={required}
                className={'shadow-md'}
                disabled={disabled}
                {...field}/>
              :
              <Textarea
                placeholder={placeholder}
                aria-required={required}
                className={'shadow-md'}
                disabled={disabled}
                {...field}/>
            }
          </FormControl>

          <FormMessage/>
        </FormItem>
      )}/>
  );
};

export default AppFormFieldText;

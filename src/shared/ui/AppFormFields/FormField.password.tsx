'use client';

import React, {FC, ReactElement, useId, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import FormFieldText from '@/shared/ui/AppFormFields/FormField.text';
import {IAppFormFieldProps} from '@/shared/ui/AppFormFields/types';

type Props = Pick<IAppFormFieldProps, 'formModel' | 'disabled'>;

const FormFieldPassword: FC<Props> = (props): ReactElement => {
  const {formModel, disabled} = props;
  const isPasswordVisibleID = useId();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className={'w-full flex flex-col items-start justify-center gap-4'}>
      <FormFieldText
        mode={'input'}
        formModel={formModel}
        type={checked ? 'text' : 'password'}
        name={'password'}
        label={'Password'}
        placeholder={checked ? 'Password' : '•••••••••'}
        required={true}
        disabled={disabled}/>

      <div className={'flex items-end gap-2'}>
        <Checkbox
          id={isPasswordVisibleID}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(isChecked) => setChecked(isChecked as boolean)}
          title={'Show password'}/>

        <div className={'grid gap-1.5 leading-none'}>
          <label
            htmlFor={isPasswordVisibleID}
            className={'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'}>
            Show password
          </label>
        </div>
      </div>
    </div>
  );
};

export default FormFieldPassword;

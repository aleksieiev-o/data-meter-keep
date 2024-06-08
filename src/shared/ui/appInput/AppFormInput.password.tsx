'use client';

import React, {FC, ReactElement, useId, useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import {IAppFormInput} from '@/shared/ui/appInput/_types/AppFormInput.interface';

type Props = Pick<IAppFormInput, 'formModel' | 'disabled'>;

const AppFormInputPassword: FC<Props> = (props): ReactElement => {
  const {formModel, disabled} = props;
  const isPasswordVisibleID = useId();
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className={'flex w-full flex-col items-start justify-center gap-4'}>
      <AppFormInputText
        mode={'input'}
        formModel={formModel}
        type={checked ? 'text' : 'password'}
        name={'password'}
        label={'Password'}
        placeholder={checked ? 'Password' : '•••••••••'}
        required={true}
        disabled={disabled}
        isDataPending={false}
      />

      <div className={'flex items-end gap-2'}>
        <Checkbox
          id={isPasswordVisibleID}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(isChecked) => setChecked(isChecked as boolean)}
          title={'Show password'}
        />

        <div className={'grid gap-1.5 leading-none'}>
          <label
            htmlFor={isPasswordVisibleID}
            className={
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            }
          >
            Show password
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppFormInputPassword;

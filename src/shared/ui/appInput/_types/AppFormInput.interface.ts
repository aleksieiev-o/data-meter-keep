/* tslint:disable */
export interface IAppFormInput {
  mode: 'input' | 'textarea';
  formModel: any; // TODO fix type
  type: 'text' | 'email' | 'password' | 'number';
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  isDataPending: boolean;
}
/* tslint:enable */

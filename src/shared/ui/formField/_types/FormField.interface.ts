/* tslint:disable */
export interface IFormField {
  mode: 'input' | 'textarea';
  formModel: any; // TODO fix field typing
  type: 'text' | 'email' | 'password' | 'number';
  name: string; // TODO add field typing
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}

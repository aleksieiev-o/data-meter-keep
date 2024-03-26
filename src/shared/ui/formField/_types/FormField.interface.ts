export interface IFormField {
  mode: 'input' | 'textarea';
  formModel: unknown;
  type: 'text' | 'email' | 'password' | 'number';
  name: string; // TODO add field typing
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}

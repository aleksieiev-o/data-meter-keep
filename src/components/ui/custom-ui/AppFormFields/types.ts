export interface IAppFormFieldProps {
  mode: 'input' | 'textarea';
  formModel: unknown;
  type: 'text' | 'email' | 'password';
  name: string; // TODO add field typing
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}

import {FC, ReactElement} from 'react';
import {Loader2, Send} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface Props {
  formId: string;
  isLoading: boolean;
  disabled: boolean;
  title: string;
  btnBody: string;
}

const SubmitButton: FC<Props> = (props): ReactElement => {
  const {formId, isLoading, title, btnBody, disabled} = props;

  return (
    <Button
      type={'submit'}
      form={formId}
      disabled={isLoading || disabled}
      title={title}>
      <>
        {
          isLoading ? <Loader2 className={'w-5 h-5 mr-4 animate-spin'}/> : <Send className={'w-5 h-5 mr-4'}/>
        }

        {
          isLoading ?
            <p>
              Please wait
            </p>
            :
            <p>
              {btnBody}
            </p>
        }
      </>
    </Button>
  );
};

export default SubmitButton;

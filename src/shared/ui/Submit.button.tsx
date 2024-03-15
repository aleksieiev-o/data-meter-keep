import {FC, ReactElement} from 'react';
import {Loader2, Send} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface Props {
  formId: string;
  isLoading: boolean;
  title: string;
  btnBody: string;
}

const SubmitButton: FC<Props> = (props): ReactElement => {
  const {formId, isLoading, title, btnBody} = props;

  return (
    <Button
      type={'submit'}
      form={formId}
      disabled={isLoading}
      title={title}>
      <>
        {
          isLoading ? <Loader2 className={'h-4 w-4 mr-2 animate-spin'}/> : <Send className={'h-4 w-4 mr-2'}/>
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

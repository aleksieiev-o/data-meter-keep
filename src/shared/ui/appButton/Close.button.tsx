import {FC, ReactElement} from 'react';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';

const CloseButton: FC = (): ReactElement => {
  return (
    <Button variant={'outline'} title={'Close'}>
      <X className={'w-5 h-5 mr-4'}/>

      Close
    </Button>
  );
};

export default CloseButton;

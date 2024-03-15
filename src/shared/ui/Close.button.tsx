import {FC, ReactElement} from 'react';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';

const CloseButton: FC = (): ReactElement => {
  return (
    <Button variant={'ghost'} title={'Close'}>
      <X className={'h-4 w-4 mr-2'}/>
      Close
    </Button>
  );
};

export default CloseButton;

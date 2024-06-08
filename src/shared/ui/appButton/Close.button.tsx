import {FC, ReactElement} from 'react';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';

const CloseButton: FC = (): ReactElement => {
  return (
    <Button variant={'outline'} title={'Close'}>
      <X className={'mr-4 h-5 w-5'} />
      Close
    </Button>
  );
};

export default CloseButton;

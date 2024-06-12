import {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';

const CloseButton: FC = (): ReactElement => {
  return (
    <Button variant={'outline'} title={'Close'}>
      Close
    </Button>
  );
};

export default CloseButton;

import {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';

const GoToPreviousPageButton: FC = (): ReactElement => {
  const {back} = useRouter();

  return (
    <Button onClick={() => back()} variant={'ghost'} title={'Back'}>
      <ChevronLeft className={'w-5 h-5 mr-4'}/>
      <p>
        Back
      </p>
    </Button>
  );
};

export default GoToPreviousPageButton;

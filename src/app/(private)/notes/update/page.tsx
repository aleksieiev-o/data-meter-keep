import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import CreateOrUpdateNote from '@/widgets/CreateOrUpdateNote/CreateOrUpdateNote';

const UpdateNotePage: FC = async (): Promise<ReactElement> => {
  return (
    <ScrollContentWrapper>
      <div className={'w-full h-full flex items-center justify-center'}>
        <CreateOrUpdateNote variant={'update'}/>
      </div>
    </ScrollContentWrapper>
  );
};

export default UpdateNotePage;

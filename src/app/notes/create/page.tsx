import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';

const CreateNotePage: FC = async (): Promise<ReactElement> => {
  return (
    <section className={'w-full h-full grid grid-cols-1 content-center overflow-hidden'}>
      <ScrollContentWrapper>
        CreateNote
      </ScrollContentWrapper>
    </section>
  );
};

export default CreateNotePage;

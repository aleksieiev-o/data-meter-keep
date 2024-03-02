import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/components/ui/custom-ui/ScrollContentWrapper';

const NoteListPage: FC = async (): Promise<ReactElement> => {
  return (
    <section className={'w-full h-full grid grid-cols-1 content-center overflow-hidden'}>
      <ScrollContentWrapper>
        Notes
      </ScrollContentWrapper>
    </section>
  );
};

export default NoteListPage;

import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
  return (
    <section className={'w-full h-full grid grid-cols-1 content-center overflow-hidden'}>
      <ScrollContentWrapper>
        Categories
      </ScrollContentWrapper>
    </section>
  );
};

export default CategoriesPage;

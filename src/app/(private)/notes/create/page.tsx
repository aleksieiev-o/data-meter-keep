import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import CreateOrUpdateNote from '@/widgets/CreateOrUpdateNote/CreateOrUpdateNote';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import {dehydrate, QueryClient, HydrationBoundary} from '@tanstack/react-query';

const CreateNotePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: fetchCategories,
    staleTime: 1000 * 5,
  });

  return (
    <ScrollContentWrapper>
      <div className={'w-full h-full flex items-center justify-center'}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateOrUpdateNote variant={'create'}/>
        </HydrationBoundary>
      </div>
    </ScrollContentWrapper>
  );
};

export default CreateNotePage;

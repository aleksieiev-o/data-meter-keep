import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import CreateOrUpdateNote from '@/widgets/CreateOrUpdateNote/CreateOrUpdateNote';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import {dehydrate, QueryClient, HydrationBoundary} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';

const CreateNotePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.CATEGORY_LIST, currentUser.uid],
      queryFn: async () => await fetchCategories(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

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

import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import CreateOrUpdateNote from '@/widgets/CreateOrUpdateNote/CreateOrUpdateNote';
import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchNotes} from '@/entities/notes/notes.service';
import {fetchCategories} from '@/entities/categories/categories.service';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';

const UpdateNotePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.CATEGORY_LIST, currentUser.uid],
      queryFn: async () => await fetchCategories(currentUser.uid),
      staleTime: 5 * 1000,
    });

    await queryClient.prefetchQuery({
      queryKey: [RoutePath.NOTE_LIST, currentUser.uid],
      queryFn: async () => await fetchNotes(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <div className={'flex h-full w-full items-center justify-center'}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateOrUpdateNote variant={'update'} />
        </HydrationBoundary>
      </div>
    </ScrollContentWrapper>
  );
};

export default UpdateNotePage;

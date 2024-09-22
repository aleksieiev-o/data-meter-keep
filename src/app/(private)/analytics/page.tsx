import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import Analytics from '@/widgets/Analytics/Analytics';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import {fetchSortedWithDateNotes} from '@/entities/notes/notes.service';

const AnalyticsPage: FC = async (): Promise<ReactElement> => {
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
      queryFn: async () => await fetchSortedWithDateNotes(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Analytics />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default AnalyticsPage;

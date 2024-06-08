import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {dehydrate, QueryClient, HydrationBoundary} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import UserSettings from '@/widgets/UserSettings/UserSettings';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.USER_SETTINGS, currentUser.uid],
      // queryFn: async () => await fetchCategories(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserSettings />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default CategoriesPage;

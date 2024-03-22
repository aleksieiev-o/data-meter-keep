import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {categoriesColumns} from '@/widgets/Categories/_ui/categoriesColumns';
import CategoriesTable from '@/widgets/Categories/CategoriesTable';
import {dehydrate, QueryClient, HydrationBoundary} from '@tanstack/react-query';
import {fetchCategories} from '@/entities/categories/categories.service';
import {RoutePath} from '@/shared/router/Routes.enum';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesTable columns={categoriesColumns}/>
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default CategoriesPage;

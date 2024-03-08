import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {categoriesColumns} from '@/widgets/Categories/_categoriesColumns';
import CategoriesTable from '@/widgets/Categories/CategoriesTable';
import {dehydrate, QueryClient, HydrationBoundary} from '@tanstack/react-query';
import {fetchCategories} from '@/entities/categories/categories.service';
import {RoutePath} from '@/shared/router/Routes.enum';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: fetchCategories,
    staleTime: 1000 * 5,
  });

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesTable columns={categoriesColumns}/>
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default CategoriesPage;

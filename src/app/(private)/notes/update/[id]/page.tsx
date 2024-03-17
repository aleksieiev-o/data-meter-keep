import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import CreateOrUpdateNote from '@/widgets/CreateOrUpdateNote/CreateOrUpdateNote';
import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchNotes} from '@/entities/notes/notes.service';
import {fetchCategories} from '@/entities/categories/categories.service';

const UpdateNotePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RoutePath.CATEGORY_LIST],
    queryFn: fetchCategories,
    staleTime: 5 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: fetchNotes,
    staleTime: 5 * 1000,
  });

  return (
    <ScrollContentWrapper>
      <div className={'w-full h-full flex items-center justify-center'}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateOrUpdateNote variant={'update'}/>
        </HydrationBoundary>
      </div>
    </ScrollContentWrapper>
  );
};

export default UpdateNotePage;

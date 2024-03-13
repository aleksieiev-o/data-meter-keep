import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import NotesTable from '@/widgets/Notes/NotesTable';
import {notesColumns} from '@/widgets/Notes/_ui/notesColumns';

const NoteListPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [RoutePath.NOTE_LIST],
    queryFn: fetchCategories,
    staleTime: 1000 * 5,
  });

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesTable columns={notesColumns}/>
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default NoteListPage;

import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchCategories} from '@/entities/categories/categories.service';
import NotesTable from '@/widgets/Notes/NotesTable';
import {notesColumns} from '@/widgets/Notes/_ui/notesColumns';
import {fetchNotes} from '@/entities/notes/notes.service';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';

const NoteListPage: FC = async (): Promise<ReactElement> => {
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesTable columns={notesColumns}/>
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default NoteListPage;

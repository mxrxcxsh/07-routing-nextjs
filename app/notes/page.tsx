import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesProps = {
  searchParams: Promise<{
    page: number;
    query: string;
  }>;
};

const Notes = async ({ searchParams }: NotesProps) => {
  const { page, query } = await searchParams;
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, query],
    queryFn: () => fetchNotes({ page, perPage, query }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};
export default Notes;

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

interface NoteDetailsByIdProps {
  params: Promise<{
    id: string;
  }>;
}

const NoteDetailsById = async ({ params }: NoteDetailsByIdProps) => {
  const id = (await params).id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
};
export default NoteDetailsById;

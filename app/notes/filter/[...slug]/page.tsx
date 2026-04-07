import NotesFilterClient from '../NotesFilter.client';
import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesFilters({ params }: NotesFiltersProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = new QueryClient();
  const page = 1;
  const perPage = 12;
  const query = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', 'filter', tag ?? 'all', page, query],
    queryFn: () => fetchNotes({ page, perPage, tag, query }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesFilterClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}

export default NotesFilters;

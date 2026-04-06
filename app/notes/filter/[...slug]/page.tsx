import NotesFilterClient from '../NotesFilter.client';

interface NotesFiltersProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesFilters({ params }: NotesFiltersProps) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  return (
    <div>
      <NotesFilterClient tag={tag} />
    </div>
  );
}

export default NotesFilters;

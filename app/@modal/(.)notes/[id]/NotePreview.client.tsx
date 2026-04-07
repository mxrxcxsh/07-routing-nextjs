'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';
import type { Note } from '@/types/note';

type Props = {
  note: Note;
};

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  return (
    <Modal useRouterBack>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
        <button
          type="button"
          className={css.backBtn}
          onClick={() => router.back()}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

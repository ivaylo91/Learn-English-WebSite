'use client';

import { useState, useTransition } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toggleGrammarBookmark } from '@/lib/actions/grammar-bookmarks';

interface Props {
  lessonId:           string;
  initialBookmarked:  boolean;
  userId?:            string;
}

export default function BookmarkButton({ lessonId, initialBookmarked, userId }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  if (!userId) return null;

  function handleToggle() {
    startTransition(async () => {
      const { bookmarked: next } = await toggleGrammarBookmark(lessonId);
      setBookmarked(next);
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={bookmarked ? 'Премахни от запазени' : 'Запази урока'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-px active:scale-[.97] disabled:opacity-60 cursor-pointer"
      style={
        bookmarked
          ? { background: 'var(--lavender)', color: 'var(--lav-ink)', border: '1px solid #c9bce4' }
          : { background: 'var(--bg-2)',     color: 'var(--muted)',    border: '1px solid var(--line)' }
      }
    >
      {isPending ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : bookmarked ? (
        <BookmarkCheck className="w-3.5 h-3.5" />
      ) : (
        <Bookmark className="w-3.5 h-3.5" />
      )}
      {bookmarked ? 'Запазено' : 'Запази'}
    </button>
  );
}

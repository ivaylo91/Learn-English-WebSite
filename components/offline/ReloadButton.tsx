'use client';

import { RefreshCw } from 'lucide-react';

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white cursor-pointer active:scale-[.98] transition-all"
      style={{ background: 'var(--coral)', boxShadow: '0 8px 16px -8px rgba(232,99,58,.5)' }}
    >
      <RefreshCw className="w-4 h-4" />
      Опитай отново
    </button>
  );
}

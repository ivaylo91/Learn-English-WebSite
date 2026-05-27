'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CheckCircle2, X } from 'lucide-react';

function Banner() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get('saved') !== '1') return;
    setVisible(true);
    router.replace(pathname, { scroll: false });
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, [searchParams, router, pathname]);

  if (!visible) return null;

  return (
    <div
      className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl text-sm font-medium"
      style={{ background: 'var(--sage)', color: 'var(--sage-ink)', border: '1px solid #b5d8be' }}
    >
      <CheckCircle2 className="w-4 h-4 shrink-0" />
      <span className="flex-1">Записано успешно!</span>
      <button
        onClick={() => setVisible(false)}
        style={{ color: 'var(--sage-ink)', cursor: 'pointer' }}
        aria-label="Затвори"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function SavedBanner() {
  return (
    <Suspense fallback={null}>
      <Banner />
    </Suspense>
  );
}

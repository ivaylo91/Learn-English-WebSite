'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  name: string;
  defaultValue?: string;
}

export default function AudioUploadField({ name, defaultValue = '' }: Props) {
  const [url, setUrl]             = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const sb   = createClient();
    const ext  = file.name.split('.').pop() ?? 'mp3';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error: uploadError } = await sb.storage
      .from('audio')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = sb.storage.from('audio').getPublicUrl(data.path);
    setUrl(publicUrl);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Controlled input — name is submitted with the form */}
      <input
        type="url"
        name={name}
        value={url}
        onChange={e => { setUrl(e.target.value); setError(''); }}
        placeholder="https://… (постави URL или качи файл по-долу)"
        className="w-full px-3 py-2 rounded-xl text-sm outline-none"
        style={{
          background: 'var(--bg-2)',
          border:     '1px solid var(--line)',
          color:      'var(--ink)',
        }}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-opacity disabled:opacity-60"
          style={{
            background: 'var(--sky)',
            color:      'var(--sky-ink)',
            cursor:     uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Upload  className="w-3.5 h-3.5" />
          }
          {uploading ? 'Качване…' : 'Качи .mp3'}
        </button>

        {url && !uploading && !error && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--sage-ink)' }}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            Аудиото е готово
          </span>
        )}

        {error && (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--rose-ink)' }}>
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </span>
        )}
      </div>

      {/* Hidden file picker */}
      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        className="sr-only"
        onChange={handleFile}
      />
    </div>
  );
}

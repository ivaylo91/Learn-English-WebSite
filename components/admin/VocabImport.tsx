'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Download, ArrowLeft, RotateCcw } from 'lucide-react';
import { importVocabularyWords, type VocabImportRow, type ImportResult } from '@/lib/actions/admin';

// ── CSV parsing ───────────────────────────────────────────────────────────────

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

const REQUIRED_HEADERS = ['word_en', 'word_bg', 'level', 'category'] as const;
const ALL_HEADERS      = ['word_en', 'word_bg', 'phonetic', 'level', 'category', 'example_en', 'example_bg'] as const;
const VALID_LEVELS     = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);

interface ParsedRow {
  data:  VocabImportRow;
  valid: boolean;
  error: string;
  line:  number;
}

function parseCSV(text: string): { rows: ParsedRow[]; headerError: string | null } {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n');
  if (lines.length < 2) return { rows: [], headerError: 'Het least one data row required' };

  const rawHeaders = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());

  // Check required headers
  const missing = REQUIRED_HEADERS.filter(h => !rawHeaders.includes(h));
  if (missing.length > 0) {
    return { rows: [], headerError: `Липсват колони: ${missing.join(', ')}` };
  }

  const idx = (h: string) => rawHeaders.indexOf(h);

  const rows: ParsedRow[] = lines.slice(1).map((line, i) => {
    if (!line.trim()) return null; // skip blank lines
    const cols = parseCSVLine(line);
    const get  = (h: string) => (cols[idx(h)] ?? '').trim();

    const data: VocabImportRow = {
      word_en:    get('word_en'),
      word_bg:    get('word_bg'),
      phonetic:   get('phonetic'),
      level:      get('level').toUpperCase(),
      category:   get('category'),
      example_en: get('example_en'),
      example_bg: get('example_bg'),
    };

    let error = '';
    if (!data.word_en)                      error = 'word_en е празно';
    else if (!data.word_bg)                 error = 'word_bg е празно';
    else if (!VALID_LEVELS.has(data.level)) error = `Невалидно ниво "${data.level}"`;
    else if (!data.category)                error = 'category е празно';

    return { data, valid: !error, error, line: i + 2 };
  }).filter(Boolean) as ParsedRow[];

  return { rows, headerError: null };
}

// ── Template download ─────────────────────────────────────────────────────────

function downloadTemplate() {
  const headers = ALL_HEADERS.join(',');
  const sample1 = '"resilient","устойчив","/rɪˈzɪliənt/","B2","Прилагателни","She is a resilient person.","Тя е устойчив човек."';
  const sample2 = '"nevertheless","въпреки това","",  "C1","Наречия","Nevertheless, she continued.","Въпреки това, тя продължи."';
  const csv     = [headers, sample1, sample2].join('\n');
  const blob    = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href        = url;
  a.download    = 'vocabulary_template.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ── Level badge ───────────────────────────────────────────────────────────────

const LEVEL_STYLE: Record<string, React.CSSProperties> = {
  A1: { background: 'var(--sage)',     color: 'var(--sage-ink)' },
  A2: { background: 'var(--sage)',     color: 'var(--sage-ink)' },
  B1: { background: 'var(--sky)',      color: 'var(--sky-ink)' },
  B2: { background: 'var(--sky)',      color: 'var(--sky-ink)' },
  C1: { background: 'var(--lavender)', color: 'var(--lav-ink)' },
  C2: { background: 'var(--lavender)', color: 'var(--lav-ink)' },
};

// ── Component ─────────────────────────────────────────────────────────────────

type Stage = 'idle' | 'previewing' | 'importing' | 'done';

export default function VocabImport() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [stage,       setStage]       = useState<Stage>('idle');
  const [dragging,    setDragging]    = useState(false);
  const [fileName,    setFileName]    = useState('');
  const [rows,        setRows]        = useState<ParsedRow[]>([]);
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [result,      setResult]      = useState<ImportResult | null>(null);
  const [showAll,     setShowAll]     = useState(false);

  const validRows   = rows.filter(r => r.valid);
  const invalidRows = rows.filter(r => !r.valid);

  // ── File processing ─────────────────────────────────────────────────────────
  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      setHeaderError('Само CSV файлове са поддържани.');
      setStage('previewing');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const { rows: parsed, headerError: hErr } = parseCSV(text);
      setRows(parsed);
      setHeaderError(hErr);
      setStage('previewing');
    };
    reader.readAsText(file, 'UTF-8');
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  // ── Import ──────────────────────────────────────────────────────────────────
  async function handleImport() {
    if (validRows.length === 0) return;
    setStage('importing');
    const res = await importVocabularyWords(validRows.map(r => r.data));
    setResult(res);
    setStage('done');
  }

  function handleReset() {
    setStage('idle');
    setRows([]);
    setHeaderError(null);
    setFileName('');
    setResult(null);
    setShowAll(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  // ── Render: done ────────────────────────────────────────────────────────────
  if (stage === 'done' && result) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: result.errors.length === 0 ? 'var(--sage)' : 'var(--butter)' }}
        >
          <CheckCircle2 className="w-8 h-8" style={{ color: result.errors.length === 0 ? 'var(--sage-ink)' : 'var(--butter-ink)' }} />
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--ink)' }}>Импортът завърши</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          Добавени са <strong style={{ color: 'var(--sage-ink)' }}>{result.imported} думи</strong>
          {result.errors.length > 0 && (
            <> · <strong style={{ color: 'var(--rose-ink)' }}>{result.errors.length} грешки</strong></>
          )}
        </p>

        {result.errors.length > 0 && (
          <div
            className="rounded-xl p-4 mb-6 text-left text-xs overflow-auto"
            style={{ background: 'var(--rose)', border: '1px solid #ecb9b9', maxHeight: 200 }}
          >
            {result.errors.map((e, i) => (
              <p key={i} style={{ color: 'var(--rose-ink)' }}>Ред {e.index}: {e.message}</p>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-[.98]"
            style={{ background: 'var(--coral)', color: '#fff' }}
          >
            <RotateCcw className="w-4 h-4" />
            Нов импорт
          </button>
          <a
            href="/admin/rechnik"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer active:scale-[.98]"
            style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Към речника
          </a>
        </div>
      </div>
    );
  }

  // ── Render: importing ───────────────────────────────────────────────────────
  if (stage === 'importing') {
    return (
      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <span className="w-10 h-10 border-2 rounded-full animate-spin inline-block mb-4"
          style={{ borderColor: 'var(--line)', borderTopColor: 'var(--coral)' }}
        />
        <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
          Импортиране на {validRows.length} думи…
        </p>
      </div>
    );
  }

  // ── Render: preview ─────────────────────────────────────────────────────────
  if (stage === 'previewing') {
    const displayRows = showAll ? rows : rows.slice(0, 50);

    return (
      <div>
        {/* Stats bar */}
        <div
          className="rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
        >
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>{rows.length}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Общо редове</p>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--sage-ink)' }}>{validRows.length}</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Валидни</p>
          </div>
          {invalidRows.length > 0 && (
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--rose-ink)' }}>{invalidRows.length}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>С грешки</p>
            </div>
          )}
          <p className="text-xs ml-auto" style={{ color: 'var(--muted)' }}>{fileName}</p>
        </div>

        {/* Header error */}
        {headerError && (
          <div
            className="rounded-xl p-4 mb-6 flex items-center gap-2 text-sm"
            style={{ background: 'var(--rose)', border: '1px solid #ecb9b9', color: 'var(--rose-ink)' }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {headerError}
          </div>
        )}

        {/* Table */}
        {!headerError && rows.length > 0 && (
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ border: '1px solid var(--line)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-2)' }}>
                    <th className="px-3 py-2 text-left font-semibold w-10" style={{ color: 'var(--muted)' }}>#</th>
                    <th className="px-3 py-2 text-left font-semibold" style={{ color: 'var(--ink-2)' }}>EN</th>
                    <th className="px-3 py-2 text-left font-semibold" style={{ color: 'var(--ink-2)' }}>BG</th>
                    <th className="px-3 py-2 text-left font-semibold" style={{ color: 'var(--ink-2)' }}>Ниво</th>
                    <th className="px-3 py-2 text-left font-semibold" style={{ color: 'var(--ink-2)' }}>Категория</th>
                    <th className="px-3 py-2 text-left font-semibold w-6" style={{ color: 'var(--ink-2)' }} />
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row, i) => {
                    const ls = LEVEL_STYLE[row.data.level] ?? {};
                    return (
                      <tr
                        key={i}
                        style={{
                          borderBottom: '1px solid var(--line)',
                          background: row.valid ? undefined : 'var(--rose)',
                          opacity: row.valid ? 1 : 0.9,
                        }}
                      >
                        <td className="px-3 py-2 font-mono" style={{ color: 'var(--muted)' }}>{row.line}</td>
                        <td className="px-3 py-2 font-medium max-w-[140px] truncate" style={{ color: 'var(--ink)' }}>
                          {row.data.word_en || <span style={{ color: 'var(--rose-ink)' }}>—</span>}
                        </td>
                        <td className="px-3 py-2 max-w-[140px] truncate" style={{ color: 'var(--ink-2)' }}>
                          {row.data.word_bg || <span style={{ color: 'var(--rose-ink)' }}>—</span>}
                        </td>
                        <td className="px-3 py-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={ls}>
                            {row.data.level || '?'}
                          </span>
                        </td>
                        <td className="px-3 py-2 max-w-[120px] truncate" style={{ color: 'var(--muted)' }}>
                          {row.data.category || <span style={{ color: 'var(--rose-ink)' }}>—</span>}
                        </td>
                        <td className="px-3 py-2">
                          {row.valid
                            ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--sage-ink)' }} />
                            : (
                              <span title={row.error}>
                                <XCircle className="w-3.5 h-3.5" style={{ color: 'var(--rose-ink)' }} />
                              </span>
                            )
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {rows.length > 50 && !showAll && (
              <div className="px-4 py-3 text-center" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
                <button
                  onClick={() => setShowAll(true)}
                  className="text-xs cursor-pointer hover:underline"
                  style={{ color: 'var(--coral)' }}
                >
                  Покажи всички {rows.length} реда
                </button>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {validRows.length > 0 && !headerError && (
            <button
              onClick={handleImport}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white active:scale-[.98] cursor-pointer"
              style={{ background: 'var(--coral)' }}
            >
              <Upload className="w-4 h-4" />
              Импортирай {validRows.length} думи
            </button>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold active:scale-[.98] cursor-pointer"
            style={{ background: 'var(--bg-2)', color: 'var(--ink-2)', border: '1px solid var(--line)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Смени файл
          </button>
        </div>
      </div>
    );
  }

  // ── Render: idle (upload) ───────────────────────────────────────────────────
  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="rounded-2xl p-12 text-center cursor-pointer transition-all duration-150"
        style={{
          border: `2px dashed ${dragging ? 'var(--coral)' : 'var(--line)'}`,
          background: dragging ? 'var(--coral-soft)' : 'var(--surface)',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'var(--bg-2)' }}
        >
          <FileText className="w-7 h-7" style={{ color: 'var(--muted)' }} />
        </div>
        <p className="font-semibold mb-1" style={{ color: 'var(--ink)' }}>
          Провлачи CSV файл тук
        </p>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          или кликни за избор · само .csv файлове
        </p>
      </div>

      {/* Format guide */}
      <div
        className="rounded-2xl p-5 mt-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold" style={{ color: 'var(--ink)' }}>Формат на CSV файла</h3>
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:underline"
            style={{ color: 'var(--coral)' }}
          >
            <Download className="w-3.5 h-3.5" />
            Свали шаблон
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="text-xs w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                {ALL_HEADERS.map(h => (
                  <th key={h} className="text-left px-2 py-1.5 font-mono font-semibold" style={{ color: 'var(--coral-ink)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1.5 font-medium" style={{ color: 'var(--ink)' }}>resilient</td>
                <td className="px-2 py-1.5" style={{ color: 'var(--ink-2)' }}>устойчив</td>
                <td className="px-2 py-1.5 font-mono text-[10px]" style={{ color: 'var(--muted)' }}>/rɪˈzɪliənt/</td>
                <td className="px-2 py-1.5"><span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={LEVEL_STYLE.B2}>B2</span></td>
                <td className="px-2 py-1.5" style={{ color: 'var(--muted)' }}>Прилагателни</td>
                <td className="px-2 py-1.5 text-[10px]" style={{ color: 'var(--muted)' }}>She is resilient.</td>
                <td className="px-2 py-1.5 text-[10px]" style={{ color: 'var(--muted)' }}>Тя е устойчива.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--rose-ink)' }}>Задължителни:</span>{' '}
            word_en, word_bg, level, category
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--sage-ink)' }}>Незадължителни:</span>{' '}
            phonetic, example_en, example_bg
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--ink-2)' }}>Нива:</span>{' '}
            A1 · A2 · B1 · B2 · C1 · C2
          </p>
        </div>
      </div>
    </div>
  );
}

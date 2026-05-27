// Server component — no 'use client' needed

interface Props {
  activeDates: string[]; // YYYY-MM-DD strings (all history, not limited to 70 days)
}

function toUTCDateStr(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const BG_MONTHS = ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ное', 'Дек'];
const DAY_LABELS = ['П', 'В', 'С', 'Ч', 'П', 'С', 'Н']; // Mon–Sun

export default function StreakCalendar({ activeDates }: Props) {
  const activeSet = new Set(activeDates);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = toUTCDateStr(today);

  // Align to Monday-based weeks
  const dow = today.getUTCDay(); // 0=Sun..6=Sat
  const daysSinceMonday = (dow + 6) % 7; // Mon→0 … Sun→6

  // Start of current week (Monday)
  const startOfWeek = new Date(today);
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - daysSinceMonday);

  // Go back 9 more weeks → 10 weeks total
  const startDate = new Date(startOfWeek);
  startDate.setUTCDate(startDate.getUTCDate() - 9 * 7);

  // Build 70-day grid
  type Cell = { dateStr: string; active: boolean; future: boolean; month: number };
  const days: Cell[] = [];
  for (let i = 0; i < 70; i++) {
    const d = new Date(startDate);
    d.setUTCDate(d.getUTCDate() + i);
    const dateStr = toUTCDateStr(d);
    days.push({
      dateStr,
      active: activeSet.has(dateStr),
      future: d > today,
      month: d.getUTCMonth(),
    });
  }

  // Split into 10 weeks (columns), each week = 7 days starting Monday
  const weeks: Cell[][] = [];
  for (let i = 0; i < 70; i += 7) weeks.push(days.slice(i, i + 7));

  // Month label: show label at the first column that starts a new month
  const monthLabels: (string | null)[] = weeks.map((week, wi) => {
    const m = week[0].month;
    if (wi === 0) return BG_MONTHS[m];
    const prevM = weeks[wi - 1][0].month;
    return m !== prevM ? BG_MONTHS[m] : null;
  });

  // Active days in displayed range
  const activeDayCount = days.filter(d => d.active).length;

  return (
    <div>
      {/* Month row */}
      <div className="flex gap-1 mb-1 pl-6">
        {monthLabels.map((label, i) => (
          <div
            key={i}
            className="flex-1 text-center"
            style={{ fontSize: '9px', color: label ? 'var(--muted)' : 'transparent', lineHeight: 1 }}
          >
            {label ?? '.'}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1">
        {/* Day-of-week labels */}
        <div className="flex flex-col gap-1 mr-1 justify-around">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              style={{ fontSize: '9px', color: 'var(--muted)', lineHeight: 1, width: '12px', textAlign: 'right' }}
            >
              {/* only show Mon / Wed / Fri to reduce noise */}
              {i % 2 === 0 ? d : ''}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 flex-1">
            {week.map((day) => (
              <div
                key={day.dateStr}
                title={day.dateStr}
                style={{
                  height: '10px',
                  borderRadius: '2px',
                  background: day.future
                    ? 'transparent'
                    : day.active
                    ? day.dateStr === todayStr
                      ? 'var(--coral)'
                      : 'var(--coral-ink)'
                    : 'var(--bg-2)',
                  outline: day.dateStr === todayStr ? '2px solid var(--coral)' : undefined,
                  outlineOffset: day.dateStr === todayStr ? '1px' : undefined,
                  opacity: day.future ? 0 : 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend + count */}
      <div className="flex items-center justify-between mt-3 pl-6">
        <p style={{ fontSize: '11px', color: 'var(--muted)' }}>
          {activeDayCount} {activeDayCount === 1 ? 'активен ден' : 'активни дни'} през последните 10 седмици
        </p>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>по-малко</span>
          {[0.15, 0.35, 0.6, 1].map((op, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: `rgba(232,99,58,${op})`,
              }}
            />
          ))}
          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>повече</span>
        </div>
      </div>
    </div>
  );
}

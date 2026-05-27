interface FieldProps {
  label: string;
  name: string;
  children: React.ReactNode;
  hint?: string;
}

export function Field({ label, name, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs" style={{ color: 'var(--muted)' }}>{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--line)',
  background: 'var(--bg)',
  color: 'var(--ink)',
  borderRadius: 10,
  padding: '8px 12px',
  fontSize: 14,
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input({ name, ...rest }: InputProps) {
  return (
    <input
      id={name}
      name={name}
      style={inputStyle}
      onFocus={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
      {...rest}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function Textarea({ name, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      style={{ ...inputStyle, resize: 'vertical' }}
      onFocus={e => { e.currentTarget.style.borderColor = 'var(--coral)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232,99,58,.15)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
      {...rest}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { value: string; label: string }[];
}

export function Select({ name, options, ...rest }: SelectProps) {
  return (
    <select
      id={name}
      name={name}
      style={{ ...inputStyle }}
      {...rest}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

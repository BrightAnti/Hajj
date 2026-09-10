import { cn } from '../lib/utils';

export function Input({ label, error, className, containerClassName, ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500',
          'disabled:bg-slate-50 disabled:text-slate-500',
          error && 'border-red-300 focus:ring-red-500/30 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function Select({ label, options, error, className, containerClassName, ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      )}
      <select
        className={cn(
          'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500/30"
        {...props}
      />
      {label && <span className="text-sm text-slate-600">{label}</span>}
    </label>
  );
}

export function Textarea({ label, error, className, containerClassName, ...props }) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      )}
      <textarea
        className={cn(
          'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white resize-none',
          'placeholder:text-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500',
          error && 'border-red-300',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({ icon = Inbox, title, description, actionLabel, onAction }) {
  const Icon = icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-4 rounded-full bg-slate-100 mb-4">
        <Icon size={32} className="text-slate-400" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 text-center max-w-sm mb-4">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

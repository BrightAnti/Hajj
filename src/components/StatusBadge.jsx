const paymentConfig = {
  fully_paid: { label: 'Fully Paid', variant: 'success' },
  partial: { label: 'Partial', variant: 'warning' },
  overdue: { label: 'Overdue', variant: 'danger' },
  unpaid: { label: 'Unpaid', variant: 'neutral' },
};

const documentConfig = {
  verified: { label: 'Verified', variant: 'success' },
  submitted: { label: 'Submitted', variant: 'info' },
  pending: { label: 'Pending', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'danger' },
};

const travelConfig = {
  ready: { label: 'Ready', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  blocked: { label: 'Blocked', variant: 'danger' },
  departed: { label: 'Departed', variant: 'info' },
};

const visaConfig = {
  approved: { label: 'Approved', variant: 'success' },
  processing: { label: 'Processing', variant: 'info' },
  pending: { label: 'Pending', variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'danger' },
};

const genericConfig = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'neutral' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  scheduled: { label: 'Scheduled', variant: 'info' },
  open: { label: 'Open', variant: 'warning' },
  completed: { label: 'Completed', variant: 'success' },
  allocated: { label: 'Allocated', variant: 'success' },
  available: { label: 'Available', variant: 'neutral' },
  forming: { label: 'Forming', variant: 'warning' },
  planning: { label: 'Planning', variant: 'info' },
  reserved: { label: 'Reserved', variant: 'info' },
};

const variantStyles = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

function getConfig(status, type) {
  const maps = {
    payment: paymentConfig,
    document: documentConfig,
    travel: travelConfig,
    visa: visaConfig,
  };
  const map = maps[type] || genericConfig;
  return map[status] || { label: status, variant: 'neutral' };
}

export default function StatusBadge({ status, type = 'generic', size = 'sm' }) {
  const config = getConfig(status, type);
  const sizeClass = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${variantStyles[config.variant]} ${sizeClass}`}
    >
      {config.label}
    </span>
  );
}

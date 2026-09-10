import { StatCard } from '../../components/Card';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { financeSummary, payments } from '../../data/payments';
import { formatCurrency, formatDate } from '../../lib/utils';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PaymentsPage() {
  const columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'pilgrimName', label: 'Pilgrim' },
    { key: 'amount', label: 'Amount', render: (r) => <span className="font-medium">{formatCurrency(r.amount)}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'method', label: 'Method' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Expected Revenue" value={formatCurrency(financeSummary.totalExpected)} icon={DollarSign} color="primary" />
        <StatCard title="Amount Collected" value={formatCurrency(financeSummary.collected)} icon={TrendingUp} color="teal" change={`${((financeSummary.collected / financeSummary.totalExpected) * 100).toFixed(0)}% collected`} changeType="up" />
        <StatCard title="Outstanding Balance" value={formatCurrency(financeSummary.outstanding)} icon={AlertTriangle} color="amber" />
      </div>

      <DataTable columns={columns} data={payments} />
    </div>
  );
}

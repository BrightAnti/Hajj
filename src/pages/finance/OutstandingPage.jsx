import { pilgrims } from '../../data/pilgrims';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { formatCurrency } from '../../lib/utils';

export default function OutstandingPage() {
  const outstanding = pilgrims.filter((p) => p.paymentStatus !== 'fully_paid');

  const columns = [
    { key: 'name', label: 'Pilgrim' },
    { key: 'package', label: 'Package' },
    { key: 'totalAmount', label: 'Total', render: (r) => formatCurrency(r.totalAmount) },
    { key: 'paidAmount', label: 'Paid', render: (r) => formatCurrency(r.paidAmount) },
    { key: 'balance', label: 'Balance', render: (r) => <span className="font-medium text-amber-600">{formatCurrency(r.totalAmount - r.paidAmount)}</span> },
    { key: 'paymentStatus', label: 'Status', render: (r) => <StatusBadge status={r.paymentStatus} type="payment" /> },
  ];

  return <DataTable columns={columns} data={outstanding} />;
}

import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { documents } from '../../data/documents';
import { formatDate } from '../../lib/utils';

export default function DocumentLibraryPage() {
  const columns = [
    { key: 'id', label: 'Document ID' },
    { key: 'pilgrimName', label: 'Pilgrim' },
    { key: 'type', label: 'Type' },
    { key: 'submittedDate', label: 'Submitted', render: (r) => formatDate(r.submittedDate) },
    { key: 'reviewedBy', label: 'Reviewed By', render: (r) => r.reviewedBy || '—' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} type="document" /> },
  ];

  return <DataTable columns={columns} data={documents} />;
}

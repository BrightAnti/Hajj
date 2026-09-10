import { SimpleTable } from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { departures } from '../../data/flights';
import { formatDate } from '../../lib/utils';

export default function DeparturesPage() {
  return (
    <SimpleTable
      title="Departure Schedule"
      subtitle="All scheduled group departures"
      columns={[
        { key: 'group', label: 'Group' },
        { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
        { key: 'time', label: 'Time' },
        { key: 'destination', label: 'Destination' },
        { key: 'pilgrims', label: 'Pilgrims' },
        { key: 'bus', label: 'Bus' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]}
      data={departures}
    />
  );
}

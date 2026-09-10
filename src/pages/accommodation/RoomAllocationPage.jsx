import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { roomAllocations } from '../../data/hotels';
import { formatDate } from '../../lib/utils';

export default function RoomAllocationPage() {
  const columns = [
    { key: 'hotel', label: 'Hotel' },
    { key: 'room', label: 'Room' },
    { key: 'pilgrim', label: 'Pilgrim' },
    { key: 'group', label: 'Group' },
    { key: 'checkIn', label: 'Check In', render: (r) => formatDate(r.checkIn) },
    { key: 'checkOut', label: 'Check Out', render: (r) => formatDate(r.checkOut) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return <DataTable columns={columns} data={roomAllocations} />;
}

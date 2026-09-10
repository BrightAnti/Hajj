import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, MoreHorizontal } from 'lucide-react';
import DataTable from '../components/DataTable';
import SearchBar, { FilterBar } from '../components/SearchBar';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { pilgrims } from '../data/pilgrims';
import { getInitials } from '../lib/utils';

const PAGE_SIZE = 8;

const filters = [
  {
    key: 'paymentStatus',
    label: 'Payment Status',
    options: [
      { value: 'fully_paid', label: 'Fully Paid' },
      { value: 'partial', label: 'Partial' },
      { value: 'overdue', label: 'Overdue' },
    ],
  },
  {
    key: 'documentStatus',
    label: 'Document Status',
    options: [
      { value: 'verified', label: 'Verified' },
      { value: 'pending', label: 'Pending' },
      { value: 'submitted', label: 'Submitted' },
      { value: 'rejected', label: 'Rejected' },
    ],
  },
  {
    key: 'travelStatus',
    label: 'Travel Status',
    options: [
      { value: 'ready', label: 'Ready' },
      { value: 'pending', label: 'Pending' },
      { value: 'blocked', label: 'Blocked' },
    ],
  },
];

export default function PilgrimsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return pilgrims.filter((p) => {
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchPayment = !filterValues.paymentStatus || p.paymentStatus === filterValues.paymentStatus;
      const matchDocument = !filterValues.documentStatus || p.documentStatus === filterValues.documentStatus;
      const matchTravel = !filterValues.travelStatus || p.travelStatus === filterValues.travelStatus;
      return matchSearch && matchPayment && matchDocument && matchTravel;
    });
  }, [search, filterValues]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold">
            {getInitials(row.name)}
          </div>
          <div>
            <p className="font-medium text-slate-900">{row.name}</p>
            <p className="text-xs text-slate-400">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone' },
    { key: 'package', label: 'Package' },
    { key: 'paymentStatus', label: 'Payment', render: (r) => <StatusBadge status={r.paymentStatus} type="payment" /> },
    { key: 'documentStatus', label: 'Documents', render: (r) => <StatusBadge status={r.documentStatus} type="document" /> },
    { key: 'travelStatus', label: 'Travel', render: (r) => <StatusBadge status={r.travelStatus} type="travel" /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/pilgrims/${row.id}`); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-primary-700 hover:bg-primary-50"
          >
            <Eye size={16} />
          </button>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Search by name, phone, or ID..." className="sm:max-w-xs" />
          <FilterBar filters={filters} values={filterValues} onChange={(key, val) => { setFilterValues({ ...filterValues, [key]: val }); setCurrentPage(1); }} />
        </div>
        <Button icon={Plus} onClick={() => navigate('/pilgrims/add')}>Add Pilgrim</Button>
      </div>

      <DataTable
        columns={columns}
        data={paginated}
        onRowClick={(row) => navigate(`/pilgrims/${row.id}`)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}

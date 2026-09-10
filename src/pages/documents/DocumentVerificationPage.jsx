import { useState } from 'react';
import { Check, X, FileText, Eye } from 'lucide-react';
import Card, { CardHeader } from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { documents } from '../../data/documents';
import { formatDate } from '../../lib/utils';

export default function DocumentVerificationPage() {
  const pendingDocs = documents.filter((d) => d.status === 'pending' || d.status === 'submitted');
  const [selected, setSelected] = useState(pendingDocs[0] || null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-180px)]">
      <Card className="lg:col-span-2 overflow-hidden flex flex-col" padding={false}>
        <div className="px-5 py-4 border-b border-slate-200">
          <CardHeader title="Pending Documents" subtitle={`${pendingDocs.length} documents awaiting review`} />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {pendingDocs.length === 0 ? (
            <EmptyState title="No pending documents" description="All documents have been reviewed." />
          ) : (
            pendingDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelected(doc)}
                className={`w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors ${
                  selected?.id === doc.id ? 'bg-primary-50 border-l-2 border-primary-600' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{doc.pilgrimName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.type}</p>
                  </div>
                  <StatusBadge status={doc.status} type="document" size="xs" />
                </div>
                <p className="text-xs text-slate-400 mt-1">Submitted {formatDate(doc.submittedDate)}</p>
              </button>
            ))
          )}
        </div>
      </Card>

      <Card className="lg:col-span-3 flex flex-col">
        {selected ? (
          <>
            <CardHeader
              title={selected.type}
              subtitle={`${selected.pilgrimName} — ${selected.id}`}
              action={<StatusBadge status={selected.status} type="document" />}
            />

            <div className="flex-1 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[300px] mb-4">
              <FileText size={48} className="text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-600">Document Preview</p>
              <p className="text-xs text-slate-400 mt-1">{selected.type} — {selected.pilgrimName}</p>
              <Button variant="secondary" size="sm" icon={Eye} className="mt-4">View Full Document</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500">Pilgrim</p>
                <p className="text-sm font-medium">{selected.pilgrimName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Submitted</p>
                <p className="text-sm font-medium">{formatDate(selected.submittedDate)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Document Type</p>
                <p className="text-sm font-medium">{selected.type}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Pilgrim ID</p>
                <p className="text-sm font-medium">{selected.pilgrimId}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button variant="success" icon={Check} className="flex-1">Approve Document</Button>
              <Button variant="danger" icon={X} className="flex-1">Reject Document</Button>
            </div>
          </>
        ) : (
          <EmptyState title="Select a document" description="Choose a document from the queue to review." icon={FileText} />
        )}
      </Card>
    </div>
  );
}

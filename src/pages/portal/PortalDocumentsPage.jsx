import { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import Card, { CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { documents } from '../../data/documents';
import { formatDate } from '../../lib/utils';

const requiredDocs = [
  { type: 'Passport Copy', desc: 'Clear scan of bio-data page. Must be valid for 6+ months.' },
  { type: 'Ghana Card Copy', desc: 'Front and back of your Ghana Card.' },
  { type: 'Yellow Fever Certificate', desc: 'Required for travel to Saudi Arabia. Obtain from Korle Bu or regional hospital.' },
  { type: 'Medical Certificate', desc: 'Fit-to-travel certificate from a licensed physician.' },
];

const statusIcon = {
  verified: { icon: CheckCircle, color: 'text-emerald-600' },
  submitted: { icon: Clock, color: 'text-blue-600' },
  pending: { icon: Clock, color: 'text-amber-600' },
  rejected: { icon: XCircle, color: 'text-red-600' },
};

export default function PortalDocumentsPage() {
  const { pilgrim } = usePortalAuth();
  const [uploading, setUploading] = useState(null);

  if (!pilgrim) return null;

  const myDocs = documents.filter((d) => d.pilgrimId === pilgrim.id);

  const getDocStatus = (type) => {
    const doc = myDocs.find((d) => d.type === type);
    return doc?.status || 'not_uploaded';
  };

  const handleUpload = (type) => {
    setUploading(type);
    setTimeout(() => setUploading(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Documents</h1>
        <p className="text-sm text-slate-500">Upload required documents for your Hajj application</p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <FileText size={20} className="text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          All documents must be verified before your visa can be processed. Upload clear, readable copies.
        </p>
      </div>

      <div className="space-y-3">
        {requiredDocs.map((doc) => {
          const status = getDocStatus(doc.type);
          const uploaded = status !== 'not_uploaded';
          const StatusIcon = uploaded ? statusIcon[status]?.icon || Clock : Upload;
          const iconColor = uploaded ? statusIcon[status]?.color || 'text-slate-400' : 'text-slate-400';

          return (
            <Card key={doc.type} className="!p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <StatusIcon size={20} className={`${iconColor} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{doc.type}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                    {uploaded && (
                      <div className="mt-2">
                        <StatusBadge status={status} type="document" size="xs" />
                        {myDocs.find((d) => d.type === doc.type)?.notes && (
                          <p className="text-xs text-red-600 mt-1">{myDocs.find((d) => d.type === doc.type).notes}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {!uploaded || status === 'rejected' ? (
                  <Button
                    size="sm"
                    variant={status === 'rejected' ? 'outline' : 'primary'}
                    icon={Upload}
                    onClick={() => handleUpload(doc.type)}
                    disabled={uploading === doc.type}
                  >
                    {uploading === doc.type ? 'Uploading...' : status === 'rejected' ? 'Re-upload' : 'Upload'}
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400">
                    {myDocs.find((d) => d.type === doc.type)?.submittedDate &&
                      formatDate(myDocs.find((d) => d.type === doc.type).submittedDate)}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {myDocs.length > 0 && (
        <Card>
          <CardHeader title="Submitted Documents" subtitle={`${myDocs.length} documents on file`} />
          <div className="divide-y divide-slate-100">
            {myDocs.map((doc) => (
              <div key={doc.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{doc.type}</p>
                  <p className="text-xs text-slate-500">Submitted {formatDate(doc.submittedDate)}</p>
                </div>
                <StatusBadge status={doc.status} type="document" />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

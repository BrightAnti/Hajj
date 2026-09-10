import Card, { CardHeader } from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { formatCurrency, formatDate } from '../../lib/utils';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right">{value || '—'}</span>
    </div>
  );
}

export default function PortalApplicationPage() {
  const { pilgrim } = usePortalAuth();
  if (!pilgrim) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Application</h1>
        <p className="text-sm text-slate-500">Application ID: {pilgrim.id}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <StatusBadge status={pilgrim.paymentStatus} type="payment" />
        <StatusBadge status={pilgrim.documentStatus} type="document" />
        <StatusBadge status={pilgrim.visaStatus} type="visa" />
        <StatusBadge status={pilgrim.travelStatus} type="travel" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Package Details" />
          <InfoRow label="Package" value={pilgrim.package} />
          <InfoRow label="Group" value={pilgrim.group} />
          <InfoRow label="Total Cost" value={formatCurrency(pilgrim.totalAmount)} />
          <InfoRow label="Amount Paid" value={formatCurrency(pilgrim.paidAmount)} />
          <InfoRow label="Registered" value={formatDate(pilgrim.registeredDate)} />
        </Card>

        <Card>
          <CardHeader title="Personal Information" />
          <InfoRow label="Full Name" value={pilgrim.name} />
          <InfoRow label="Phone" value={pilgrim.phone} />
          <InfoRow label="Email" value={pilgrim.email} />
          <InfoRow label="Nationality" value={pilgrim.nationality} />
          {pilgrim.region && <InfoRow label="Region" value={pilgrim.region} />}
        </Card>

        <Card>
          <CardHeader title="Passport Information" />
          <InfoRow label="Passport Number" value={pilgrim.passportNumber} />
          <InfoRow label="Expiry Date" value={pilgrim.passportExpiry ? formatDate(pilgrim.passportExpiry) : '—'} />
        </Card>

        <Card>
          <CardHeader title="Emergency Contact" />
          <InfoRow label="Name" value={pilgrim.emergencyContact?.name} />
          <InfoRow label="Phone" value={pilgrim.emergencyContact?.phone} />
          <InfoRow label="Relationship" value={pilgrim.emergencyContact?.relation} />
        </Card>
      </div>

      {(pilgrim.flight || pilgrim.hotel) && (
        <Card>
          <CardHeader title="Travel Assignment" subtitle="Assigned by your agency" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="Flight" value={pilgrim.flight} />
            <InfoRow label="Hotel" value={pilgrim.hotel} />
            <InfoRow label="Room" value={pilgrim.room} />
            <InfoRow label="Group" value={pilgrim.group} />
          </div>
        </Card>
      )}

      <Card>
        <CardHeader title="Application Timeline" />
        <div className="space-y-4">
          {[
            { label: 'Application registered', date: pilgrim.registeredDate, done: true },
            { label: 'Documents submitted', date: pilgrim.documentStatus !== 'pending' ? pilgrim.registeredDate : null, done: pilgrim.documentStatus !== 'pending' },
            { label: 'Documents verified', date: pilgrim.documentStatus === 'verified' ? pilgrim.registeredDate : null, done: pilgrim.documentStatus === 'verified' },
            { label: 'Visa processing', date: pilgrim.visaStatus === 'processing' || pilgrim.visaStatus === 'approved' ? 'In progress' : null, done: pilgrim.visaStatus === 'approved' },
            { label: 'Ready to travel', date: pilgrim.travelStatus === 'ready' ? 'Confirmed' : null, done: pilgrim.travelStatus === 'ready' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.done ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <div>
                <p className={`text-sm ${item.done ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{item.label}</p>
                {item.date && <p className="text-xs text-slate-400">{typeof item.date === 'string' && item.date.includes('-') ? formatDate(item.date) : item.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

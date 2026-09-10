import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Plane, Hotel, Edit } from 'lucide-react';
import Card, { CardHeader } from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { MiniProgressBar } from '../components/Charts';
import { getPilgrimById } from '../data/pilgrims';
import { formatCurrency, formatDate, getInitials } from '../lib/utils';

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value || '—'}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card>
      <CardHeader title={title} />
      {children}
    </Card>
  );
}

export default function PilgrimProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pilgrim = getPilgrimById(id);

  if (!pilgrim) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Pilgrim not found</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/pilgrims')}>Back to list</Button>
      </div>
    );
  }

  const paymentPct = (pilgrim.paidAmount / pilgrim.totalAmount) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/pilgrims')} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center text-lg font-bold">
            {getInitials(pilgrim.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{pilgrim.name}</h2>
            <p className="text-sm text-slate-500">{pilgrim.id} · {pilgrim.nationality}</p>
            <div className="flex gap-2 mt-2">
              <StatusBadge status={pilgrim.paymentStatus} type="payment" />
              <StatusBadge status={pilgrim.documentStatus} type="document" />
              <StatusBadge status={pilgrim.travelStatus} type="travel" />
              <StatusBadge status={pilgrim.visaStatus} type="visa" />
            </div>
          </div>
        </div>
        <Button variant="secondary" icon={Edit}>Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InfoRow label="Full Name" value={pilgrim.name} />
              <InfoRow label="Gender" value={pilgrim.gender} />
              <InfoRow label="Date of Birth" value={formatDate(pilgrim.dateOfBirth)} />
              <InfoRow label="Nationality" value={pilgrim.nationality} />
              {pilgrim.region && <InfoRow label="Region" value={pilgrim.region} />}
              <InfoRow label="Phone" value={pilgrim.phone} />
              <InfoRow label="Email" value={pilgrim.email} />
            </div>
          </Section>

          <Section title="Passport Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InfoRow label="Passport Number" value={pilgrim.passportNumber} />
              <InfoRow label="Expiry Date" value={formatDate(pilgrim.passportExpiry)} />
            </div>
          </Section>

          <Section title="Emergency Contact">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InfoRow label="Contact Name" value={pilgrim.emergencyContact.name} />
              <InfoRow label="Phone" value={pilgrim.emergencyContact.phone} />
              <InfoRow label="Relationship" value={pilgrim.emergencyContact.relation} />
            </div>
          </Section>

          <Section title="Travel Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <InfoRow label="Flight" value={pilgrim.flight || 'Not assigned'} />
              <InfoRow label="Hotel" value={pilgrim.hotel || 'Not assigned'} />
              <InfoRow label="Room" value={pilgrim.room || 'Not assigned'} />
              <InfoRow label="Group" value={pilgrim.group} />
            </div>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Package Details">
            <InfoRow label="Package" value={pilgrim.package} />
            <InfoRow label="Group" value={pilgrim.group} />
            <InfoRow label="Registered" value={formatDate(pilgrim.registeredDate)} />
          </Section>

          <Section title="Payment Summary">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Amount</span>
                <span className="font-semibold">{formatCurrency(pilgrim.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Paid</span>
                <span className="font-semibold text-emerald-600">{formatCurrency(pilgrim.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Remaining</span>
                <span className="font-semibold text-amber-600">{formatCurrency(pilgrim.totalAmount - pilgrim.paidAmount)}</span>
              </div>
              <MiniProgressBar value={pilgrim.paidAmount} max={pilgrim.totalAmount} />
              <p className="text-xs text-slate-400 text-center">{paymentPct.toFixed(0)}% paid</p>
            </div>
          </Section>

          <Section title="Documents">
            <div className="space-y-2">
              {['Passport Copy', 'Ghana Card Copy', 'Yellow Fever Certificate', 'Medical Certificate'].map((doc) => (
                <div key={doc} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-700">{doc}</span>
                  <StatusBadge status={pilgrim.documentStatus} type="document" size="xs" />
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

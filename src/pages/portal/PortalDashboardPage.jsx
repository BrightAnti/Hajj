import { Link } from 'react-router-dom';
import { CreditCard, FileText, Plane, ChevronRight, AlertCircle } from 'lucide-react';
import Card, { CardHeader } from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { MiniProgressBar } from '../../components/Charts';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { formatCurrency, formatDate } from '../../lib/utils';

const checklistItems = [
  { key: 'application', label: 'Application submitted', check: (p) => !!p.registeredDate },
  { key: 'payment', label: 'Initial payment made', check: (p) => p.paidAmount > 0 },
  { key: 'documents', label: 'Documents verified', check: (p) => p.documentStatus === 'verified' },
  { key: 'visa', label: 'Visa approved', check: (p) => p.visaStatus === 'approved' },
  { key: 'travel', label: 'Ready to travel', check: (p) => p.travelStatus === 'ready' },
];

export default function PortalDashboardPage() {
  const { pilgrim } = usePortalAuth();
  if (!pilgrim) return null;

  const balance = pilgrim.totalAmount - pilgrim.paidAmount;
  const paymentPct = pilgrim.totalAmount > 0 ? (pilgrim.paidAmount / pilgrim.totalAmount) * 100 : 0;
  const completedSteps = checklistItems.filter((item) => item.check(pilgrim)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Welcome, {pilgrim.name.split(' ')[0]}</h1>
        <p className="text-sm text-slate-500">Application ID: {pilgrim.id}</p>
      </div>

      {pilgrim.applicationStatus === 'submitted' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <AlertCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Application submitted successfully</p>
            <p className="text-xs text-blue-700 mt-0.5">Our team will review your application within 2–3 business days. Upload your documents and make your first payment to proceed.</p>
          </div>
        </div>
      )}

      {/* Status overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="!p-4">
          <p className="text-xs text-slate-500 mb-1">Payment</p>
          <StatusBadge status={pilgrim.paymentStatus} type="payment" />
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-slate-500 mb-1">Documents</p>
          <StatusBadge status={pilgrim.documentStatus} type="document" />
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-slate-500 mb-1">Visa</p>
          <StatusBadge status={pilgrim.visaStatus} type="visa" />
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-slate-500 mb-1">Travel</p>
          <StatusBadge status={pilgrim.travelStatus} type="travel" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Payment progress */}
        <Card>
          <CardHeader title="Payment Progress" subtitle={pilgrim.package} />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Paid</span>
              <span className="font-semibold text-emerald-600">{formatCurrency(pilgrim.paidAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Balance</span>
              <span className="font-semibold text-amber-600">{formatCurrency(balance)}</span>
            </div>
            <MiniProgressBar value={pilgrim.paidAmount} max={pilgrim.totalAmount} />
            <p className="text-xs text-slate-400 text-center">{paymentPct.toFixed(0)}% of {formatCurrency(pilgrim.totalAmount)}</p>
          </div>
          {balance > 0 && (
            <Link to="/portal/payments" className="mt-4 flex items-center justify-center gap-1 text-sm text-primary-700 font-medium hover:text-primary-800">
              Make a payment <ChevronRight size={14} />
            </Link>
          )}
        </Card>

        {/* Hajj checklist */}
        <Card>
          <CardHeader title="Hajj Readiness" subtitle={`${completedSteps} of ${checklistItems.length} steps complete`} />
          <div className="space-y-2">
            {checklistItems.map((item) => {
              const done = item.check(pilgrim);
              return (
                <div key={item.key} className="flex items-center gap-3 py-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    {done ? '✓' : '○'}
                  </div>
                  <span className={`text-sm ${done ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { to: '/portal/application', icon: Plane, label: 'My Application', desc: 'View package & travel details' },
          { to: '/portal/payments', icon: CreditCard, label: 'Payments', desc: 'Pay balance via MoMo' },
          { to: '/portal/documents', icon: FileText, label: 'Documents', desc: 'Upload required documents' },
        ].map((action) => (
          <Link key={action.to} to={action.to}>
            <Card hover className="!p-4 h-full">
              <action.icon size={20} className="text-primary-600 mb-2" />
              <p className="text-sm font-semibold text-slate-900">{action.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Travel info if assigned */}
      {(pilgrim.flight || pilgrim.hotel) && (
        <Card>
          <CardHeader title="Travel Assignment" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {pilgrim.flight && <div><p className="text-slate-500 text-xs">Flight</p><p className="font-medium">{pilgrim.flight}</p></div>}
            {pilgrim.hotel && <div><p className="text-slate-500 text-xs">Hotel</p><p className="font-medium">{pilgrim.hotel}</p></div>}
            {pilgrim.group && <div><p className="text-slate-500 text-xs">Group</p><p className="font-medium">{pilgrim.group}</p></div>}
          </div>
        </Card>
      )}
    </div>
  );
}

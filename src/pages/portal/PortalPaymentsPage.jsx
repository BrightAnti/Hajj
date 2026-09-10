import { useState } from 'react';
import { Smartphone, Building2, Banknote } from 'lucide-react';
import Card, { CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import { MiniProgressBar } from '../../components/Charts';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { payments } from '../../data/payments';
import { formatCurrency, formatDate } from '../../lib/utils';

const paymentMethods = [
  { id: 'momo', label: 'MTN Mobile Money', icon: Smartphone, desc: 'Pay with MoMo — dial *170#' },
  { id: 'vodafone', label: 'Vodafone Cash', icon: Smartphone, desc: 'Pay with Vodafone Cash' },
  { id: 'bank', label: 'Bank Transfer', icon: Building2, desc: 'GCB / Ecobank transfer' },
  { id: 'cash', label: 'Pay at Office', icon: Banknote, desc: 'Visit our Accra, Kumasi or Tamale office' },
];

export default function PortalPaymentsPage() {
  const { pilgrim } = usePortalAuth();
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [payAmount, setPayAmount] = useState('');

  if (!pilgrim) return null;

  const balance = pilgrim.totalAmount - pilgrim.paidAmount;
  const myPayments = payments.filter((p) => p.pilgrimId === pilgrim.id);

  const handlePay = () => {
    setPayModalOpen(false);
    setSelectedMethod(null);
    setPayAmount('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Payments</h1>
        <p className="text-sm text-slate-500">Track and make payments for your Hajj package</p>
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500">Package Total</p>
            <p className="text-xl font-bold text-slate-900">{formatCurrency(pilgrim.totalAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Amount Paid</p>
            <p className="text-xl font-bold text-emerald-600">{formatCurrency(pilgrim.paidAmount)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Outstanding Balance</p>
            <p className="text-xl font-bold text-amber-600">{formatCurrency(balance)}</p>
          </div>
        </div>
        <MiniProgressBar value={pilgrim.paidAmount} max={pilgrim.totalAmount} />
        {balance > 0 && (
          <Button className="mt-4" onClick={() => setPayModalOpen(true)}>Make Payment</Button>
        )}
      </Card>

      <Card padding={false}>
        <div className="px-5 py-4 border-b border-slate-200">
          <CardHeader title="Payment History" subtitle={myPayments.length ? `${myPayments.length} transactions` : 'No payments yet'} />
        </div>
        {myPayments.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-500">
            No payments recorded yet. Make your first payment to secure your spot.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myPayments.map((payment) => (
              <div key={payment.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{formatCurrency(payment.amount)}</p>
                  <p className="text-xs text-slate-500">{payment.method} · {formatDate(payment.date)}</p>
                  <p className="text-xs text-slate-400 font-mono">{payment.reference}</p>
                </div>
                <StatusBadge status={payment.status} />
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Make a Payment"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPayModalOpen(false)}>Cancel</Button>
            <Button onClick={handlePay} disabled={!selectedMethod || !payAmount}>Confirm Payment</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount (GH₵)</label>
            <input
              type="number"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder={`Balance: ${balance.toLocaleString()}`}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Payment Method</p>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                    selectedMethod === method.id ? 'border-primary-600 bg-primary-50/50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <method.icon size={20} className="text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{method.label}</p>
                    <p className="text-xs text-slate-500">{method.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">This is a demo — no real payment will be processed.</p>
        </div>
      </Modal>
    </div>
  );
}

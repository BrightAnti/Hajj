import {
  Users, UserCheck, CreditCard, FileWarning, Stamp, PlaneTakeoff,
  DollarSign, Activity, Calendar,
} from 'lucide-react';
import { StatCard } from '../components/Card';
import { SimpleTable } from '../components/DataTable';
import { PaymentProgressChart, RegistrationTrendChart, DocumentCompletionChart } from '../components/Charts';
import StatusBadge from '../components/StatusBadge';
import { dashboardStats, registrationTrend, recentActivities, upcomingDepartures } from '../data/dashboard';
import { paymentProgressData } from '../data/payments';
import { documentCompletionData } from '../data/documents';
import { payments } from '../data/payments';
import { formatCurrency, formatDate } from '../lib/utils';

const activityIcons = {
  payment: '💰',
  document: '📄',
  registration: '👤',
  visa: '✅',
  accommodation: '🏨',
  group: '👥',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Pilgrims" value={dashboardStats.totalPilgrims.toLocaleString()} icon={Users} color="primary" change="12% from last season" changeType="up" />
        <StatCard title="Registered" value={dashboardStats.registered.toLocaleString()} icon={UserCheck} color="blue" />
        <StatCard title="Fully Paid" value={dashboardStats.fullyPaid.toLocaleString()} icon={CreditCard} color="teal" change="8% increase" changeType="up" />
        <StatCard title="Pending Documents" value={dashboardStats.pendingDocuments} icon={FileWarning} color="amber" />
        <StatCard title="Visa Approved" value={dashboardStats.visaApproved.toLocaleString()} icon={Stamp} color="purple" />
        <StatCard title="Ready to Travel" value={dashboardStats.readyToTravel.toLocaleString()} icon={PlaneTakeoff} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PaymentProgressChart data={paymentProgressData} />
        <RegistrationTrendChart data={registrationTrend} />
        <DocumentCompletionChart data={documentCompletionData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SimpleTable
          title="Recent Payments"
          subtitle="Latest payment transactions"
          columns={[
            { key: 'pilgrimName', label: 'Pilgrim' },
            { key: 'amount', label: 'Amount', render: (r) => formatCurrency(r.amount) },
            { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
            { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
          ]}
          data={payments.slice(0, 5)}
        />

        <SimpleTable
          title="Recent Activities"
          subtitle="Latest system activities"
          columns={[
            { key: 'action', label: 'Activity', render: (r) => (
              <div className="flex items-center gap-2">
                <span>{activityIcons[r.type]}</span>
                <div>
                  <p className="font-medium text-slate-900">{r.action}</p>
                  <p className="text-xs text-slate-500">{r.detail}</p>
                </div>
              </div>
            )},
            { key: 'time', label: 'Time', render: (r) => <span className="text-xs text-slate-400">{r.time}</span> },
          ]}
          data={recentActivities.slice(0, 5)}
        />
      </div>

      <SimpleTable
        title="Upcoming Departures"
        subtitle="Scheduled group departures"
        columns={[
          { key: 'group', label: 'Group' },
          { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
          { key: 'time', label: 'Time' },
          { key: 'destination', label: 'Destination' },
          { key: 'pilgrims', label: 'Pilgrims' },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={upcomingDepartures}
      />
    </div>
  );
}

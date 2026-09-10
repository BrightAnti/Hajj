import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { packages } from '../data/groups';
import { formatCurrency } from '../lib/utils';
import { Package } from 'lucide-react';

export default function PackagesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <Card key={pkg.id} hover>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
              <p className="text-lg font-bold text-primary-700">{formatCurrency(pkg.price)}</p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-3">{pkg.duration}</p>
          <ul className="space-y-1.5 mb-4">
            {pkg.includes.map((item) => (
              <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-sm text-slate-500">{pkg.pilgrims} pilgrims enrolled</span>
            <StatusBadge status={pkg.status} />
          </div>
        </Card>
      ))}
    </div>
  );
}

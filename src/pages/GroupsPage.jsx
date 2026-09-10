import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { groups } from '../data/groups';
import { formatDate } from '../lib/utils';
import { UsersRound, MapPin } from 'lucide-react';

export default function GroupsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map((group) => (
        <Card key={group.id} hover>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary-50 text-primary-700">
                <UsersRound size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{group.name}</h3>
                <p className="text-xs text-slate-500">{group.id}</p>
              </div>
            </div>
            <StatusBadge status={group.status} />
          </div>
          {group.office && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
              <MapPin size={12} />
              {group.office}
            </div>
          )}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Leader</span><span className="font-medium">{group.leader}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Pilgrims</span><span className="font-medium">{group.pilgrims}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Package</span><span className="font-medium">{group.package}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Departure</span><span className="font-medium">{formatDate(group.departure)}</span></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

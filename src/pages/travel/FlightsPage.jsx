import Card, { CardHeader } from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { MiniProgressBar } from '../../components/Charts';
import { flights } from '../../data/flights';
import { formatDate } from '../../lib/utils';
import { Plane, Users, Clock, MapPin } from 'lucide-react';

export default function FlightsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {flights.map((flight) => {
          const occupancyPct = (flight.booked / flight.capacity) * 100;
          return (
            <Card key={flight.id} hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                    <Plane size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{flight.flightNumber}</h3>
                    <p className="text-xs text-slate-500">{flight.airline}</p>
                  </div>
                </div>
                <StatusBadge status={flight.status} />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <p className="text-xs text-slate-500">From</p>
                  <p className="text-sm font-medium">{flight.origin}</p>
                </div>
                <div className="flex-shrink-0 px-3">
                  <div className="w-8 border-t-2 border-dashed border-slate-300 relative">
                    <Plane size={14} className="absolute -top-2 left-1/2 -translate-x-1/2 text-primary-600 rotate-90" />
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-slate-500">To</p>
                  <p className="text-sm font-medium">{flight.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Departure</p>
                    <p className="text-sm font-medium">{flight.departureTime}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date</p>
                  <p className="text-sm font-medium">{formatDate(flight.departureDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Group</p>
                  <p className="text-sm font-medium truncate">{flight.group}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-500 flex items-center gap-1"><Users size={12} /> {flight.booked}/{flight.capacity} passengers</span>
                  <span className="font-medium text-slate-700">{occupancyPct.toFixed(0)}%</span>
                </div>
                <MiniProgressBar
                  value={flight.booked}
                  max={flight.capacity}
                  color={occupancyPct > 90 ? 'bg-amber-500' : 'bg-blue-600'}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

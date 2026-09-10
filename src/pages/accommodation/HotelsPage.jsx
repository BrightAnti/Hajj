import Card, { CardHeader } from '../../components/Card';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { MiniProgressBar } from '../../components/Charts';
import { hotels, roomAllocations } from '../../data/hotels';
import { formatDate } from '../../lib/utils';
import { Building2, MapPin, Phone, Star } from 'lucide-react';

export default function HotelsPage() {
  const allocationColumns = [
    { key: 'hotel', label: 'Hotel' },
    { key: 'room', label: 'Room' },
    { key: 'pilgrim', label: 'Pilgrim' },
    { key: 'group', label: 'Group' },
    { key: 'checkIn', label: 'Check In', render: (r) => formatDate(r.checkIn) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((hotel) => {
          const roomPct = (hotel.occupiedRooms / hotel.totalRooms) * 100;
          const guestPct = (hotel.occupied / hotel.capacity) * 100;
          return (
            <Card key={hotel.id} hover>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{hotel.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <StatusBadge status={hotel.status} />
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                <MapPin size={12} />
                {hotel.location} — {hotel.address}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500">Check-in / Check-out</p>
                  <p className="text-sm font-medium">{formatDate(hotel.checkIn)} — {formatDate(hotel.checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Contact</p>
                  <p className="text-sm font-medium flex items-center gap-1"><Phone size={12} /> {hotel.contactPhone}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Rooms: {hotel.occupiedRooms}/{hotel.totalRooms}</span>
                    <span className="font-medium">{roomPct.toFixed(0)}%</span>
                  </div>
                  <MiniProgressBar value={hotel.occupiedRooms} max={hotel.totalRooms} color="bg-purple-600" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Guests: {hotel.occupied}/{hotel.capacity}</span>
                    <span className="font-medium">{guestPct.toFixed(0)}%</span>
                  </div>
                  <MiniProgressBar value={hotel.occupied} max={hotel.capacity} color="bg-emerald-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Room Allocations</h3>
        <DataTable columns={allocationColumns} data={roomAllocations} />
      </div>
    </div>
  );
}

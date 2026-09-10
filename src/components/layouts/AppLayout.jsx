import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { cn } from '../../lib/utils';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Operational overview — Hajj 2026 season (Ghana)' },
  '/pilgrims': { title: 'All Pilgrims', subtitle: 'Manage and track all registered pilgrims' },
  '/pilgrims/add': { title: 'Add Pilgrim', subtitle: 'Register a new pilgrim' },
  '/pilgrims/groups': { title: 'Groups', subtitle: 'Manage pilgrim groups by region' },
  '/packages': { title: 'Packages', subtitle: 'Hajj package offerings (prices in GH₵)' },
  '/finance/payments': { title: 'Payments', subtitle: 'Payment transactions and records' },
  '/finance/outstanding': { title: 'Outstanding Balances', subtitle: 'Track unpaid and partial payments' },
  '/finance/receipts': { title: 'Receipts', subtitle: 'Payment receipts and invoices' },
  '/documents/verification': { title: 'Document Verification', subtitle: 'Review and verify pilgrim documents' },
  '/documents/library': { title: 'Document Library', subtitle: 'All submitted documents' },
  '/travel/flights': { title: 'Flight Management', subtitle: 'Accra (Kotoka) to Jeddah/Madinah schedules' },
  '/travel/departures': { title: 'Departure Schedule', subtitle: 'Regional departures to Kotoka International Airport' },
  '/travel/itinerary': { title: 'Itinerary', subtitle: 'Travel itineraries by group' },
  '/accommodation/hotels': { title: 'Hotels', subtitle: 'Hotel inventory and occupancy' },
  '/accommodation/rooms': { title: 'Room Allocation', subtitle: 'Assign rooms to pilgrims' },
  '/logistics/transport': { title: 'Transport', subtitle: 'Transportation management' },
  '/logistics/buses': { title: 'Buses', subtitle: 'Bus fleet and assignments' },
  '/reports': { title: 'Reports', subtitle: 'Analytics and reporting' },
  '/settings': { title: 'Settings', subtitle: 'System configuration' },
};

function getPageInfo(pathname) {
  if (pathname.startsWith('/pilgrims/') && pathname !== '/pilgrims/add' && pathname !== '/pilgrims/groups') {
    return { title: 'Pilgrim Profile', subtitle: 'Detailed pilgrim information' };
  }
  for (const [path, info] of Object.entries(pageTitles)) {
    if (pathname === path || pathname.startsWith(path + '/')) return info;
  }
  return { title: 'HajjFlow', subtitle: '' };
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={cn('transition-all duration-300', collapsed ? 'lg:ml-[68px]' : 'lg:ml-64')}>
        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
        />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

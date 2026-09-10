import {
  LayoutDashboard, Users, Package, Wallet, FileText, Plane,
  Building2, Truck, BarChart3, Settings, ChevronDown, ChevronRight,
  UserPlus, UsersRound, CreditCard, AlertCircle, Receipt,
  FileCheck, FolderOpen, Calendar, Map, Hotel, BedDouble, Bus,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../../lib/utils';

const iconMap = {
  LayoutDashboard, Users, Package, Wallet, FileText, Plane,
  Building2, Truck, BarChart3, Settings, UserPlus, UsersRound,
  CreditCard, AlertCircle, Receipt, FileCheck, FolderOpen,
  Calendar, Map, Hotel, BedDouble, Bus,
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  {
    name: 'Pilgrims',
    icon: 'Users',
    children: [
      { name: 'All Pilgrims', href: '/pilgrims', icon: 'Users' },
      { name: 'Add Pilgrim', href: '/pilgrims/add', icon: 'UserPlus' },
      { name: 'Groups', href: '/pilgrims/groups', icon: 'UsersRound' },
    ],
  },
  { name: 'Packages', href: '/packages', icon: 'Package' },
  {
    name: 'Finance',
    icon: 'Wallet',
    children: [
      { name: 'Payments', href: '/finance/payments', icon: 'CreditCard' },
      { name: 'Outstanding Balances', href: '/finance/outstanding', icon: 'AlertCircle' },
      { name: 'Receipts', href: '/finance/receipts', icon: 'Receipt' },
    ],
  },
  {
    name: 'Documents',
    icon: 'FileText',
    children: [
      { name: 'Verification Queue', href: '/documents/verification', icon: 'FileCheck' },
      { name: 'Document Library', href: '/documents/library', icon: 'FolderOpen' },
    ],
  },
  {
    name: 'Travel Operations',
    icon: 'Plane',
    children: [
      { name: 'Flights', href: '/travel/flights', icon: 'Plane' },
      { name: 'Departure Schedule', href: '/travel/departures', icon: 'Calendar' },
      { name: 'Itinerary', href: '/travel/itinerary', icon: 'Map' },
    ],
  },
  {
    name: 'Accommodation',
    icon: 'Building2',
    children: [
      { name: 'Hotels', href: '/accommodation/hotels', icon: 'Hotel' },
      { name: 'Room Allocation', href: '/accommodation/rooms', icon: 'BedDouble' },
    ],
  },
  {
    name: 'Logistics',
    icon: 'Truck',
    children: [
      { name: 'Transport', href: '/logistics/transport', icon: 'Truck' },
      { name: 'Buses', href: '/logistics/buses', icon: 'Bus' },
    ],
  },
  { name: 'Reports', href: '/reports', icon: 'BarChart3' },
  { name: 'Settings', href: '/settings', icon: 'Settings' },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const hasChildren = item.children?.length > 0;
  const isChildActive = hasChildren && item.children.some((c) => location.pathname.startsWith(c.href));
  const [expanded, setExpanded] = useState(isChildActive);
  const Icon = iconMap[item.icon];

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            isChildActive ? 'text-white bg-sidebar-active' : 'text-slate-300 hover:text-white hover:bg-sidebar-hover'
          )}
        >
          <Icon size={18} className="shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.name}</span>
              {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </>
          )}
        </button>
        {!collapsed && expanded && (
          <div className="ml-4 mt-0.5 space-y-0.5 border-l border-slate-700 pl-3">
            {item.children.map((child) => {
              const ChildIcon = iconMap[child.icon];
              return (
                <NavLink
                  key={child.href}
                  to={child.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors',
                      isActive ? 'text-emerald-400 bg-sidebar-active' : 'text-slate-400 hover:text-white hover:bg-sidebar-hover'
                    )
                  }
                >
                  <ChildIcon size={15} />
                  {child.name}
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isActive ? 'text-white bg-sidebar-active' : 'text-slate-300 hover:text-white hover:bg-sidebar-hover'
        )
      }
    >
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span>{item.name}</span>}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-sidebar flex flex-col transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className={cn('flex items-center h-16 border-b border-slate-700/50 px-4', collapsed ? 'justify-center' : 'gap-3')}>
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">HF</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white font-bold text-base leading-tight">HajjFlow Ghana</h1>
              <p className="text-slate-400 text-[10px] leading-tight">Hajj Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-white text-xs font-semibold">
                AU
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@hajjflow.com.gh</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

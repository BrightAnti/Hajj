import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { getInitials } from '../../lib/utils';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { name: 'My Application', href: '/portal/application', icon: ClipboardList },
  { name: 'Payments', href: '/portal/payments', icon: CreditCard },
  { name: 'Documents', href: '/portal/documents', icon: FileText },
];

export default function PortalLayout({ children }) {
  const { pilgrim, logout } = usePortalAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <NavLink to="/portal/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">HF</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-slate-900 text-sm leading-tight">HajjFlow Ghana</p>
                <p className="text-[10px] text-slate-500 leading-tight">Pilgrim Portal</p>
              </div>
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'
                  )
                }
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-semibold">
                {getInitials(pilgrim?.name || 'P')}
              </div>
              <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">{pilgrim?.name}</span>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-slate-200 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium',
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'
                  )
                }
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

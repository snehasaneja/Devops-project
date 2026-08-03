import React from 'react';
import { Calendar, Ticket, ShieldAlert, LogIn, LogOut, User, Sparkles, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

interface NavbarProps {
  currentTab: 'events' | 'my-bookings' | 'admin';
  setCurrentTab: (tab: 'events' | 'my-bookings' | 'admin') => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenAuth }) => {
  const { user, isAuthenticated, isAdmin, logout, setDemoUser } = useAuth();
  const { bookings } = useEvents();

  const userBookingsCount = bookings.filter(b => b.status === 'Confirmed').length;

  return (
    <header className="navbar-container">
      <div className="navbar-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTab('events')}
          >
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-outfit text-xl font-bold tracking-tight text-slate-900">ABC Events</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">Portal</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Smart Event Management System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setCurrentTab('events')}
              className={`nav-link ${currentTab === 'events' ? 'active' : ''}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Browse Events</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setCurrentTab('my-bookings')}
                className={`nav-link ${currentTab === 'my-bookings' ? 'active' : ''}`}
              >
                <Ticket className="w-4 h-4" />
                <span>My Tickets</span>
                {userBookingsCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                    {userBookingsCount}
                  </span>
                )}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`nav-link admin ${currentTab === 'admin' ? 'active' : ''}`}
              >
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Admin Console</span>
              </button>
            )}
          </nav>

          {/* User / Auth Controls */}
          <div className="flex items-center gap-3">

            {/* Role Demo Switcher Badge */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 text-xs text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
              <span className="text-slate-400">Role:</span>
              <button
                onClick={() => setDemoUser('user')}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${
                  isAuthenticated && !isAdmin ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setDemoUser('admin')}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${
                  isAdmin ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200'
                }`}
              >
                Admin
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm border border-blue-200">
                    {user?.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn-primary px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

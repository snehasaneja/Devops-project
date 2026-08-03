import React from 'react';
import { useEvents } from '../context/EventContext';
import { Event } from '../types';
import { ShieldCheck, Plus, Edit, Trash2, DollarSign, Ticket, Calendar, Users, Percent, Sparkles, Building2 } from 'lucide-react';

interface AdminDashboardProps {
  onOpenAddEvent: () => void;
  onOpenEditEvent: (event: Event) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenAddEvent, onOpenEditEvent }) => {
  const { events, bookings, stats, deleteEvent } = useEvents();

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-700">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2 border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span>Admin Management Console</span>
          </div>
          <h1 className="font-outfit text-3xl font-bold">Smart Event Control Center</h1>
          <p className="text-xs text-blue-200 mt-1">
            Create, update, or remove events, monitor live ticket sales, and track seat capacity.
          </p>
        </div>

        <button
          onClick={onOpenAddEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 border border-blue-400 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">${stats?.totalRevenue ?? 0}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ Confirmed ticket bookings</span>
          </p>
        </div>

        {/* Tickets Sold */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tickets Sold</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalTicketsSold ?? 0}</p>
          <p className="text-[11px] text-blue-600 font-semibold">
            Across {stats?.totalBookingsCount ?? 0} user orders
          </p>
        </div>

        {/* Active Events */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Events</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.totalEvents ?? 0}</p>
          <p className="text-[11px] text-slate-500 font-medium">Published in portal</p>
        </div>

        {/* Avg Occupancy Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Occupancy</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{stats?.averageOccupancy ?? 0}%</p>
          <p className="text-[11px] text-indigo-600 font-semibold">
            {stats?.totalSeatsBooked ?? 0} / {stats?.totalSeatsCapacity ?? 0} seats filled
          </p>
        </div>

      </div>

      {/* Events CRUD Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-outfit text-xl font-bold text-slate-900">Manage Published Events</h2>
            <p className="text-xs text-slate-500">Add, edit details, or delete events from live catalog.</p>
          </div>

          <button
            onClick={onOpenAddEvent}
            className="btn-primary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                <th className="py-3.5 px-4">Event Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Seats Booked</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {events.map((e) => {
                const remaining = e.totalSeats - e.bookedSeats;
                return (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition">
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={e.imageUrl}
                          alt={e.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm line-clamp-1">{e.title}</p>
                          <p className="text-slate-400 text-[11px] truncate max-w-xs">{e.venue}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        {e.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-700">
                      <p className="font-bold">{e.date}</p>
                      <p className="text-slate-400 text-[11px]">{e.time}</p>
                    </td>

                    <td className="py-4 px-4 font-bold text-blue-600 text-sm">
                      ${e.price}
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900">
                          {e.bookedSeats} / {e.totalSeats}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min(100, (e.bookedSeats / e.totalSeats) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenEditEvent(e)}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-bold"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${e.title}"?`)) {
                              deleteEvent(e.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-bold"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Bookings Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div>
          <h2 className="font-outfit text-xl font-bold text-slate-900">Recent User Bookings</h2>
          <p className="text-xs text-slate-500">Live booking activity stream.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                <th className="py-3 px-4">Ticket Ref</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Tier & Qty</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">{b.ticketNumber}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{b.userName}</p>
                    <p className="text-slate-400 text-[11px]">{b.userEmail}</p>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{b.eventTitle}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded">
                      {b.ticketTier} ({b.quantity}x)
                    </span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-emerald-600">${b.totalAmount}</td>
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

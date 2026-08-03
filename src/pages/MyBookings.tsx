import React from 'react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { Booking } from '../types';
import { Ticket, Calendar, MapPin, QrCode, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

interface MyBookingsProps {
  onViewTicket: (booking: Booking) => void;
  onBrowseEvents: () => void;
}

export const MyBookings: React.FC<MyBookingsProps> = ({ onViewTicket, onBrowseEvents }) => {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useEvents();

  const userBookings = bookings.filter((b) => b.userId === user?.id || user?.role === 'admin');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-700">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">
            <Ticket className="w-4 h-4 text-blue-300" />
            <span>Booking History</span>
          </div>
          <h1 className="font-outfit text-3xl font-bold">My Reserved Tickets & Passes</h1>
          <p className="text-xs text-blue-200 mt-1">
            View digital e-Passes, seat numbers, QR codes, or cancel bookings in real time.
          </p>
        </div>

        <button
          onClick={onBrowseEvents}
          className="bg-white hover:bg-blue-50 text-blue-900 px-6 py-3 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-md shrink-0"
        >
          <span>Explore More Events</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bookings List */}
      {userBookings.length > 0 ? (
        <div className="space-y-4">
          {userBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Column: Event details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 bg-blue-100 text-blue-800 font-extrabold text-xs rounded-full border border-blue-200">
                    {b.ticketTier} Tier
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    Ref: {b.ticketNumber}
                  </span>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-md border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Confirmed
                  </span>
                </div>

                <h3 className="font-outfit text-xl font-bold text-slate-900">{b.eventTitle}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" /> {b.eventDate} ({b.eventTime})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600" /> {b.eventVenue}
                  </span>
                </div>
              </div>

              {/* Middle Column: Seats & Price */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-row lg:flex-col items-center lg:items-start justify-between gap-2 shrink-0">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Seats Reserved ({b.quantity})</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {b.seats.map((seat) => (
                      <span key={seat} className="px-2 py-0.5 bg-blue-600 text-white font-bold text-xs rounded-md">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right lg:text-left pt-1">
                  <span className="text-[11px] text-slate-400 font-medium block">Total Paid</span>
                  <p className="text-lg font-extrabold text-blue-600">${b.totalAmount}</p>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <button
                  onClick={() => onViewTicket(b)}
                  className="flex-1 lg:flex-initial py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View e-Pass</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this booking? Reserved seats will be released back.')) {
                      cancelBooking(b.id);
                    }
                  }}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  title="Cancel Booking"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="font-outfit text-xl font-bold text-slate-900">No Bookings Yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You haven't booked any tickets yet. Browse our upcoming tech, music, and leadership summits to reserve your seats!
          </p>
          <button
            onClick={onBrowseEvents}
            className="btn-primary px-6 py-3 rounded-xl text-xs font-semibold"
          >
            Browse Upcoming Events
          </button>
        </div>
      )}

    </div>
  );
};

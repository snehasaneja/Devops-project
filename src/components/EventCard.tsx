import React from 'react';
import { Calendar, Clock, MapPin, Ticket, UserCheck, Edit, Trash2, ArrowRight } from 'lucide-react';
import { Event } from '../types';
import { useAuth } from '../context/AuthContext';

interface EventCardProps {
  event: Event;
  onBook: (event: Event) => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onBook, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();

  const remainingSeats = event.totalSeats - event.bookedSeats;
  const isSoldOut = remainingSeats <= 0;
  const bookedPercentage = Math.min(100, Math.round((event.bookedSeats / event.totalSeats) * 100));

  // Category badge colors
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'tech':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'music':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'workshop':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'corporate':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Event Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Fallback image if unsplash fails
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Top Header Tags */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${getCategoryBadgeClass(event.category)}`}>
              {event.category}
            </span>

            {/* Admin Quick Action Controls */}
            {isAdmin && onEdit && onDelete && (
              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur p-1 rounded-full border border-slate-700/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(event);
                  }}
                  className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"
                  title="Edit Event"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(event.id);
                  }}
                  className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition"
                  title="Delete Event"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Price Badge Overlay */}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-xl text-sm font-extrabold shadow-md border border-blue-400">
            ${event.price} <span className="text-[11px] font-normal opacity-90">/ seat</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          
          <div>
            <h3 className="font-outfit text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
              {event.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 font-normal leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Details list */}
          <div className="space-y-2 pt-1 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Seat Capacity Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-blue-600" /> Availability
              </span>
              <span className={isSoldOut ? 'text-red-600 font-bold' : remainingSeats < 20 ? 'text-amber-600 font-bold' : 'text-blue-600'}>
                {isSoldOut ? 'Sold Out' : `${remainingSeats} seats left`}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isSoldOut
                    ? 'bg-red-500'
                    : remainingSeats < 20
                    ? 'bg-amber-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${bookedPercentage}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onBook(event)}
          disabled={isSoldOut}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            isSoldOut
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-500/20'
          }`}
        >
          <span>{isSoldOut ? 'Event Sold Out' : 'Book Tickets'}</span>
          {!isSoldOut && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};

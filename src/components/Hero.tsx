import React from 'react';
import { Search, Calendar, Ticket, ShieldCheck, Sparkles, MapPin, Tag } from 'lucide-react';
import { useEvents } from '../context/EventContext';

export const Hero: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, events } = useEvents();

  const categories = ['All', 'Tech', 'Music', 'Workshop', 'Corporate', 'Sports'];

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white overflow-hidden py-14 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl mb-10 border border-blue-700/50">
      
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        
        {/* Company Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-200 tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span>BookMyEvents Pvt. Ltd. Official Portal</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Discover & Book Extraordinary <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-300">
            Smart Events & Summits
          </span>
        </h1>

        <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          Reserve tickets instantly, access digital e-Passes with QR verification, and manage full event seatings through our high-performance portal.
        </p>

        {/* Live Search & Filter Bar */}
        <div className="bg-white p-2.5 rounded-2xl shadow-2xl border border-slate-100 text-slate-800 max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-5 h-5 text-blue-600 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by event title, venue, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => setSearchQuery('')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <span className="text-xs font-semibold text-blue-200 mr-2 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Categories:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-white text-blue-900 shadow-md scale-105 font-bold'
                  : 'bg-blue-800/60 hover:bg-blue-700/80 text-blue-100 border border-blue-600/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quick Highlights Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-blue-700/60 text-left">
          <div className="bg-blue-950/40 backdrop-blur p-3.5 rounded-2xl border border-blue-700/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{events.length} Active</p>
              <p className="text-[11px] text-blue-200 font-medium">Upcoming Events</p>
            </div>
          </div>

          <div className="bg-blue-950/40 backdrop-blur p-3.5 rounded-2xl border border-blue-700/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Instant</p>
              <p className="text-[11px] text-blue-200 font-medium">Digital e-Tickets</p>
            </div>
          </div>

          <div className="bg-blue-950/40 backdrop-blur p-3.5 rounded-2xl border border-blue-700/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">100% Guaranteed</p>
              <p className="text-[11px] text-blue-200 font-medium">Verified Seats</p>
            </div>
          </div>

          <div className="bg-blue-950/40 backdrop-blur p-3.5 rounded-2xl border border-blue-700/40 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Top Venues</p>
              <p className="text-[11px] text-blue-200 font-medium">Halls & Amphitheaters</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

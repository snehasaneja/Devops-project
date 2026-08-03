import React from 'react';
import { Hero } from '../components/Hero';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../context/EventContext';
import { Event } from '../types';
import { CalendarX, Sparkles, FilterX } from 'lucide-react';

interface HomeProps {
  onSelectEventToBook: (event: Event) => void;
  onEditEvent?: (event: Event) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectEventToBook, onEditEvent, onDeleteEvent }) => {
  const { events, selectedCategory, searchQuery, setSelectedCategory, setSearchQuery } = useEvents();


  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Banner with Search & Category Pills */}
      <Hero />

      {/* Main Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="font-outfit text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>Upcoming Events</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {events.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {selectedCategory !== 'All' ? `Filtering by ${selectedCategory}` : 'Showing all upcoming smart events & workshops'}
          </p>
        </div>

        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="self-start sm:self-auto text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 transition"
          >
            <FilterX className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBook={onSelectEventToBook}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <CalendarX className="w-8 h-8" />
          </div>
          <h3 className="font-outfit text-xl font-bold text-slate-900">No Events Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't find any events matching "{searchQuery}" in category "{selectedCategory}". Try searching for another keyword or resetting the filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold"
          >
            Show All Events
          </button>
        </div>
      )}

    </div>
  );
};

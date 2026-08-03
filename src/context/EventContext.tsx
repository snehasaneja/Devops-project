import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Booking, AdminStats } from '../types';
import { useAuth } from './AuthContext';

const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'Global AI & Cloud Tech Summit 2026',
    description: 'Explore cutting-edge advancements in generative AI, DevOps automation, cloud architecture, and quantum computing with lead engineers from global tech pioneers.',
    category: 'Tech',
    date: '2026-09-15',
    time: '09:00 AM - 05:00 PM',
    venue: 'Convention Center Main Hall, San Francisco, CA',
    price: 149,
    totalSeats: 250,
    bookedSeats: 184,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    organizer: 'ABC Solutions Tech Team',
    tags: ['AI', 'Cloud', 'DevOps', 'Keynote']
  },
  {
    id: 'evt_2',
    title: 'Symphony Under the Stars',
    description: 'An enchanting evening of live classical orchestral music performed outdoors under illuminated starlight with gourmet dining options and wine pairing.',
    category: 'Music',
    date: '2026-08-28',
    time: '07:30 PM - 10:30 PM',
    venue: 'Grand Amphitheater Gardens, Austin, TX',
    price: 85,
    totalSeats: 400,
    bookedSeats: 392,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    organizer: 'City Cultural Trust',
    tags: ['Music', 'Orchestra', 'Outdoors']
  },
  {
    id: 'evt_3',
    title: 'Full-Stack React & Node Intensive Workshop',
    description: 'Hands-on coding bootcamp covering microservices, state management, security best practices, and automated testing pipelines.',
    category: 'Workshop',
    date: '2026-09-02',
    time: '10:00 AM - 04:00 PM',
    venue: 'ABC Solutions Innovation Hub, Room 4B',
    price: 99,
    totalSeats: 50,
    bookedSeats: 38,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    organizer: 'ABC Dev Academy',
    tags: ['Coding', 'React', 'Node.js']
  },
  {
    id: 'evt_4',
    title: 'Corporate Leadership & Executive Strategy Expo',
    description: 'Network with executive leaders, discover enterprise growth strategies, and participate in interactive roundtable discussions.',
    category: 'Corporate',
    date: '2026-10-12',
    time: '08:30 AM - 04:30 PM',
    venue: 'Grand Hyatt Ballroom, New York, NY',
    price: 199,
    totalSeats: 300,
    bookedSeats: 120,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
    organizer: 'ABC Leadership Group',
    tags: ['Leadership', 'Networking', 'Strategy']
  },
  {
    id: 'evt_5',
    title: 'International eSports Arena Championship 2026',
    description: 'Top global teams compete live for a $500,000 prize pool in arena action with live casting, merchandise booths, and gaming zone access.',
    category: 'Sports',
    date: '2026-09-20',
    time: '01:00 PM - 09:00 PM',
    venue: 'Metro Esports Arena, Seattle, WA',
    price: 45,
    totalSeats: 600,
    bookedSeats: 512,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
    organizer: 'Nexus Gaming League',
    tags: ['Gaming', 'Esports', 'Live']
  },
  {
    id: 'evt_6',
    title: 'UX/UI & Product Design Masterclass',
    description: 'Master human-centered design, modern Figma prototyping, dynamic design systems, and usability testing from leading design directors.',
    category: 'Workshop',
    date: '2026-08-30',
    time: '02:00 PM - 06:00 PM',
    venue: 'Design Loft Studio 302, Chicago, IL',
    price: 75,
    totalSeats: 60,
    bookedSeats: 58,
    status: 'Upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=80',
    organizer: 'ABC Creative Lab',
    tags: ['Design', 'UI/UX', 'Figma']
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg_101',
    eventId: 'evt_1',
    eventTitle: 'Global AI & Cloud Tech Summit 2026',
    eventDate: '2026-09-15',
    eventTime: '09:00 AM - 05:00 PM',
    eventVenue: 'Convention Center Main Hall, San Francisco, CA',
    userId: 'usr_1',
    userName: 'Alex Johnson',
    userEmail: 'alex@example.com',
    quantity: 2,
    ticketTier: 'VIP',
    unitPrice: 149,
    totalAmount: 298,
    ticketNumber: 'TKT-2026-884192',
    bookingDate: '2026-08-01T14:22:00.000Z',
    status: 'Confirmed',
    seats: ['V-183', 'V-184']
  }
];

interface EventContextType {
  events: Event[];
  bookings: Booking[];
  stats: AdminStats;
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  addEvent: (eventData: Partial<Event>) => Event;
  updateEvent: (id: string, eventData: Partial<Event>) => Event;
  deleteEvent: (id: string) => void;
  bookTicket: (eventId: string, quantity: number, tier: 'General' | 'VIP' | 'Early Bird') => Booking;
  cancelBooking: (bookingId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('smart_events_list');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('smart_bookings_list');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('smart_events_list', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('smart_bookings_list', JSON.stringify(bookings));
  }, [bookings]);

  // Compute live admin statistics
  const totalEvents = events.length;
  const totalBookingsCount = bookings.length;
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.quantity, 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalSeatsCapacity = events.reduce((sum, e) => sum + e.totalSeats, 0);
  const totalSeatsBooked = events.reduce((sum, e) => sum + e.bookedSeats, 0);
  const averageOccupancy = totalSeatsCapacity ? Math.round((totalSeatsBooked / totalSeatsCapacity) * 100) : 0;

  const stats: AdminStats = {
    totalEvents,
    totalBookingsCount,
    totalTicketsSold,
    totalRevenue,
    totalSeatsCapacity,
    totalSeatsBooked,
    averageOccupancy,
  };

  const addEvent = (eventData: Partial<Event>): Event => {
    const newEvent: Event = {
      id: `evt_${Date.now()}`,
      title: eventData.title || 'Untitled Event',
      description: eventData.description || 'No description provided.',
      category: eventData.category || 'Corporate',
      date: eventData.date || new Date().toISOString().split('T')[0],
      time: eventData.time || '10:00 AM - 04:00 PM',
      venue: eventData.venue || 'Main Convention Hall',
      price: Number(eventData.price) || 50,
      totalSeats: Number(eventData.totalSeats) || 100,
      bookedSeats: 0,
      status: 'Upcoming',
      imageUrl: eventData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      organizer: 'ABC Solutions',
      tags: [eventData.category || 'Event'],
    };

    setEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, eventData: Partial<Event>): Event => {
    let updated: Event = {} as Event;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          updated = {
            ...e,
            ...eventData,
            price: eventData.price !== undefined ? Number(eventData.price) : e.price,
            totalSeats: eventData.totalSeats !== undefined ? Number(eventData.totalSeats) : e.totalSeats,
          };
          return updated;
        }
        return e;
      })
    );
    return updated;
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setBookings((prev) => prev.filter((b) => b.eventId !== id));
  };

  const bookTicket = (eventId: string, quantity: number, tier: 'General' | 'VIP' | 'Early Bird'): Booking => {
    if (!user) throw new Error('You must be logged in to book tickets.');

    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) throw new Error('Event not found.');

    const remaining = targetEvent.totalSeats - targetEvent.bookedSeats;
    if (quantity > remaining) {
      throw new Error(`Only ${remaining} seat(s) available for this event.`);
    }

    // Tier pricing multiplier
    const multiplier = tier === 'VIP' ? 1.5 : tier === 'Early Bird' ? 0.85 : 1.0;
    const unitPrice = Math.round(targetEvent.price * multiplier);
    const totalAmount = unitPrice * quantity;

    // Generate seats
    const seatPrefix = tier === 'VIP' ? 'V' : 'S';
    const startNum = targetEvent.bookedSeats + 1;
    const seats = Array.from({ length: quantity }, (_, i) => `${seatPrefix}-${startNum + i}`);

    const newBooking: Booking = {
      id: `bkg_${Date.now()}`,
      eventId: targetEvent.id,
      eventTitle: targetEvent.title,
      eventDate: targetEvent.date,
      eventTime: targetEvent.time,
      eventVenue: targetEvent.venue,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      quantity,
      ticketTier: tier,
      unitPrice,
      totalAmount,
      ticketNumber: `TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed',
      seats,
    };

    // Update booked seats count in memory
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, bookedSeats: e.bookedSeats + quantity } : e))
    );

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // Restore seats to event
    setEvents((prev) =>
      prev.map((e) =>
        e.id === booking.eventId ? { ...e, bookedSeats: Math.max(0, e.bookedSeats - booking.quantity) } : e
      )
    );

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Filter events based on selected category & search query
  const filteredEvents = events.filter((e) => {
    const matchesCategory = selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase();
    const term = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !term ||
      e.title.toLowerCase().includes(term) ||
      e.description.toLowerCase().includes(term) ||
      e.venue.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <EventContext.Provider
      value={{
        events: filteredEvents,
        bookings,
        stats,
        selectedCategory,
        searchQuery,
        setSelectedCategory,
        setSearchQuery,
        addEvent,
        updateEvent,
        deleteEvent,
        bookTicket,
        cancelBooking,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

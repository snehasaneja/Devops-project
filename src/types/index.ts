export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Tech' | 'Music' | 'Workshop' | 'Corporate' | 'Sports' | string;
  date: string;
  time: string;
  venue: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  imageUrl: string;
  organizer?: string;
  tags?: string[];
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  userId: string;
  userName: string;
  userEmail: string;
  quantity: number;
  ticketTier: 'General' | 'VIP' | 'Early Bird';
  unitPrice: number;
  totalAmount: number;
  ticketNumber: string;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
  seats: string[];
}

export interface AdminStats {
  totalEvents: number;
  totalBookingsCount: number;
  totalTicketsSold: number;
  totalRevenue: number;
  totalSeatsCapacity: number;
  totalSeatsBooked: number;
  averageOccupancy: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

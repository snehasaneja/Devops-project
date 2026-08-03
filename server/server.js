import express from 'express';
import cors from 'cors';
import { initialEvents, initialUsers, initialBookings } from './seedData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database Arrays
let users = [...initialUsers];
let events = [...initialEvents];
let bookings = [...initialBookings];

// Helper to generate unique IDs
const generateId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

// ==========================================
// AUTHENTICATION ENDPOINTS
// ==========================================

// Register User
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }

  const newUser = {
    id: generateId('usr'),
    name,
    email: email.toLowerCase(),
    password, // Stored for in-memory check
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  // Return user object without sensitive raw password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword,
    token: `mock_jwt_token_${newUser.id}`,
  });
});

// Login User
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token: `mock_jwt_token_${user.id}`,
  });
});

// ==========================================
// EVENT MANAGEMENT ENDPOINTS
// ==========================================

// Get All Events (with optional category & search filter)
app.get('/api/events', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...events];

  if (category && category !== 'All') {
    filtered = filtered.filter((e) => e.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const term = String(search).toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term) ||
        e.venue.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

// Get Single Event
app.get('/api/events/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// Add New Event (Admin)
app.post('/api/events', (req, res) => {
  const {
    title,
    description,
    category,
    date,
    time,
    venue,
    price,
    totalSeats,
    imageUrl,
    organizer = 'ABC Solutions',
    tags = [],
  } = req.body;

  if (!title || !date || !time || !venue || price === undefined || !totalSeats) {
    return res.status(400).json({ error: 'Please provide all required event details.' });
  }

  const newEvent = {
    id: generateId('evt'),
    title,
    description: description || 'No description provided.',
    category: category || 'Corporate',
    date,
    time,
    venue,
    price: Number(price),
    totalSeats: Number(totalSeats),
    bookedSeats: 0,
    status: 'Upcoming',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    organizer,
    tags: Array.isArray(tags) ? tags : [category || 'Event'],
  };

  events.unshift(newEvent);
  res.status(201).json({ message: 'Event created successfully', event: newEvent });
});

// Update Event (Admin)
app.put('/api/events/:id', (req, res) => {
  const eventIndex = events.findIndex((e) => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const updatedEvent = {
    ...events[eventIndex],
    ...req.body,
    price: req.body.price !== undefined ? Number(req.body.price) : events[eventIndex].price,
    totalSeats: req.body.totalSeats !== undefined ? Number(req.body.totalSeats) : events[eventIndex].totalSeats,
  };

  events[eventIndex] = updatedEvent;
  res.json({ message: 'Event updated successfully', event: updatedEvent });
});

// Delete Event (Admin)
app.delete('/api/events/:id', (req, res) => {
  const eventIndex = events.findIndex((e) => e.id === req.params.id);

  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];

  // Optional: Clean up associated bookings
  bookings = bookings.filter((b) => b.eventId !== req.params.id);

  res.json({ message: 'Event deleted successfully', eventId: deletedEvent.id });
});

// ==========================================
// BOOKING ENDPOINTS
// ==========================================

// Get Bookings (Filter by userId if passed)
app.get('/api/bookings', (req, res) => {
  const { userId } = req.query;

  if (userId) {
    const userBookings = bookings.filter((b) => b.userId === userId);
    return res.json(userBookings);
  }

  res.json(bookings);
});

// Book Tickets
app.post('/api/bookings', (req, res) => {
  const { eventId, userId, userName, userEmail, quantity = 1, ticketTier = 'General' } = req.body;

  if (!eventId || !userId || !userName || !userEmail) {
    return res.status(400).json({ error: 'Missing required booking parameters.' });
  }

  const event = events.find((e) => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  const qty = Number(quantity);
  const remainingSeats = event.totalSeats - event.bookedSeats;

  if (qty > remainingSeats) {
    return res.status(400).json({
      error: `Only ${remainingSeats} seat(s) available for this event.`,
    });
  }

  // Tier price multiplier
  const multiplier = ticketTier === 'VIP' ? 1.5 : ticketTier === 'Early Bird' ? 0.85 : 1.0;
  const unitPrice = Math.round(event.price * multiplier);
  const totalAmount = unitPrice * qty;

  // Generate seat numbers
  const seatPrefix = ticketTier === 'VIP' ? 'V' : 'S';
  const startSeatNumber = event.bookedSeats + 1;
  const seats = Array.from({ length: qty }, (_, i) => `${seatPrefix}-${startSeatNumber + i}`);

  // Create booking
  const newBooking = {
    id: generateId('bkg'),
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventTime: event.time,
    eventVenue: event.venue,
    userId,
    userName,
    userEmail,
    quantity: qty,
    ticketTier,
    unitPrice,
    totalAmount,
    ticketNumber: `TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    bookingDate: new Date().toISOString(),
    status: 'Confirmed',
    seats,
  };

  // Update booked count on event
  event.bookedSeats += qty;

  bookings.unshift(newBooking);

  res.status(201).json({
    message: 'Tickets booked successfully!',
    booking: newBooking,
    eventUpdated: event,
  });
});

// Cancel Booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingIndex = bookings.findIndex((b) => b.id === req.params.id);

  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  const booking = bookings[bookingIndex];

  // Restore seat count on event
  const event = events.find((e) => e.id === booking.eventId);
  if (event) {
    event.bookedSeats = Math.max(0, event.bookedSeats - booking.quantity);
  }

  // Remove booking
  bookings.splice(bookingIndex, 1);

  res.json({
    message: 'Booking cancelled successfully. Seat refund processed.',
    cancelledBookingId: req.params.id,
  });
});

// ==========================================
// ADMIN STATS ENDPOINT
// ==========================================

app.get('/api/stats', (req, res) => {
  const totalEvents = events.length;
  const totalBookingsCount = bookings.length;
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.quantity, 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalSeatsCapacity = events.reduce((sum, e) => sum + e.totalSeats, 0);
  const totalSeatsBooked = events.reduce((sum, e) => sum + e.bookedSeats, 0);
  const averageOccupancy = totalSeatsCapacity ? Math.round((totalSeatsBooked / totalSeatsCapacity) * 100) : 0;

  res.json({
    totalEvents,
    totalBookingsCount,
    totalTicketsSold,
    totalRevenue,
    totalSeatsCapacity,
    totalSeatsBooked,
    averageOccupancy,
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Smart Event Management Node Backend', timestamp: new Date() });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Smart Event Management Node Server running on http://127.0.0.1:${PORT}`);
});


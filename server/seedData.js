// Initial seed data for Node.js in-memory database
export const initialUsers = [
  {
    id: 'usr_admin',
    name: 'Admin Manager',
    email: 'admin@abcsolutions.com',
    password: 'admin123', // In real app hashed, here simple string comparison
    role: 'admin',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr_1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'user123',
    role: 'user',
    createdAt: '2026-02-10T10:30:00.000Z'
  }
];

export const initialEvents = [
  {
    id: 'evt_1',
    title: 'Global Tech Innovation Summit 2026',
    description: 'Join industry leaders, founders, and engineers to explore the future of AI, Cloud Architecture, and DevOps automation. Keynote speakers from top tech giants.',
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
    title: 'Corporate Leadership & Strategy Expo',
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
    title: 'International eSports Championship 2026',
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

export const initialBookings = [
  {
    id: 'bkg_101',
    eventId: 'evt_1',
    eventTitle: 'Global Tech Innovation Summit 2026',
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
    seats: ['A-14', 'A-15']
  }
];

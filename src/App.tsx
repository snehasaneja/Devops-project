import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EventProvider, useEvents } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { MyBookings } from './pages/MyBookings';
import { AdminDashboard } from './pages/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { TicketModal } from './components/TicketModal';
import { AuthModal } from './components/AuthModal';
import { EventFormModal } from './components/EventFormModal';
import { Toast } from './components/Toast';
import { Event, Booking } from './types';
import { Calendar, Building2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { bookTicket, addEvent, updateEvent } = useEvents();

  // Navigation State
  const [currentTab, setCurrentTab] = useState<'events' | 'my-bookings' | 'admin'>('events');

  // Modal States
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [selectedEventToBook, setSelectedEventToBook] = useState<Event | null>(null);
  const [selectedTicketToView, setSelectedTicketToView] = useState<Booking | null>(null);
  const [showEventFormModal, setShowEventFormModal] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  // Handlers
  const handleOpenBookModal = (event: Event) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setToast({ message: 'Please login or register to book tickets.', type: 'error' });
      return;
    }
    setSelectedEventToBook(event);
  };

  const handleConfirmBooking = async (quantity: number, tier: 'General' | 'VIP' | 'Early Bird') => {
    if (!selectedEventToBook) return;
    setBookingLoading(true);
    try {
      const newBooking = await bookTicket(selectedEventToBook.id, quantity, tier);
      setSelectedEventToBook(null);
      setSelectedTicketToView(newBooking);
      setToast({ message: `Successfully booked ${quantity} ticket(s) for ${selectedEventToBook.title}!`, type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to book tickets.', type: 'error' });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleOpenAddEvent = () => {
    setEventToEdit(null);
    setShowEventFormModal(true);
  };

  const handleOpenEditEvent = (event: Event) => {
    setEventToEdit(event);
    setShowEventFormModal(true);
  };

  const handleSaveEventForm = async (eventData: Partial<Event>) => {
    try {
      if (eventToEdit) {
        await updateEvent(eventToEdit.id, eventData);
        setToast({ message: 'Event updated successfully!', type: 'success' });
      } else {
        await addEvent(eventData);
        setToast({ message: 'New event published successfully!', type: 'success' });
      }
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to save event.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      
      {/* Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'events' && (
          <Home
            onSelectEventToBook={handleOpenBookModal}
            onEditEvent={handleOpenEditEvent}
            onDeleteEvent={() => {
              setToast({ message: 'Event deleted successfully!', type: 'success' });
            }}
          />
        )}

        {currentTab === 'my-bookings' && (
          <MyBookings
            onViewTicket={(booking) => setSelectedTicketToView(booking)}
            onBrowseEvents={() => setCurrentTab('events')}
          />
        )}

        {currentTab === 'admin' && (
          isAdmin ? (
            <AdminDashboard
              onOpenAddEvent={handleOpenAddEvent}
              onOpenEditEvent={handleOpenEditEvent}
            />
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto my-16">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900">Admin Access Required</h3>
              <p className="text-xs text-slate-500">
                You need an administrator account to access the control panel. Switch to Admin mode or log in as `admin@abcsolutions.com`.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold"
              >
                Log In as Admin
              </button>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-outfit text-lg font-bold text-white">ABC Solutions</span>
            </div>
            <p className="text-xs leading-relaxed">
              Enterprise Smart Event Management Portal providing digital ticketing, attendance metrics, and event hosting solutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setCurrentTab('events')} className="hover:text-white transition">Browse Events</button></li>
              <li><button onClick={() => setCurrentTab('my-bookings')} className="hover:text-white transition">My Reserved Tickets</button></li>
              <li><button onClick={() => setCurrentTab('admin')} className="hover:text-white transition">Admin Dashboard</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Tech & Features</h4>
            <ul className="space-y-2 text-xs">
              <li>React + TSX Component Architecture</li>
              <li>Node.js (Express) In-Memory Server API</li>
              <li>Instant Digital QR e-Tickets</li>
              <li>Real-Time Seat Capacity Tracking</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Contact Support</h4>
            <p className="text-xs">ABC Solutions Pvt. Ltd.</p>
            <p className="text-xs mt-1 text-slate-500">support@abcsolutions.com</p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              © 2026 ABC Solutions Pvt. Ltd. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

      {/* Modals & Overlay Components */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {selectedEventToBook && (
        <BookingModal
          event={selectedEventToBook}
          onClose={() => setSelectedEventToBook(null)}
          onConfirm={handleConfirmBooking}
          loading={bookingLoading}
        />
      )}

      {selectedTicketToView && (
        <TicketModal
          booking={selectedTicketToView}
          onClose={() => setSelectedTicketToView(null)}
        />
      )}

      {showEventFormModal && (
        <EventFormModal
          eventToEdit={eventToEdit}
          onClose={() => setShowEventFormModal(false)}
          onSubmit={handleSaveEventForm}
        />
      )}

      {/* Toast Floating Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <MainContent />
      </EventProvider>
    </AuthProvider>
  );
}

export default App;

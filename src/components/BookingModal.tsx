import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Ticket, ShieldCheck, CreditCard, Sparkles, Check } from 'lucide-react';
import { Event } from '../types';

interface BookingModalProps {
  event: Event;
  onClose: () => void;
  onConfirm: (quantity: number, tier: 'General' | 'VIP' | 'Early Bird') => Promise<void>;
  loading: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({ event, onClose, onConfirm, loading }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [ticketTier, setTicketTier] = useState<'General' | 'VIP' | 'Early Bird'>('General');

  const remainingSeats = event.totalSeats - event.bookedSeats;

  // Calculate pricing based on tier
  const getMultiplier = (tier: string) => {
    switch (tier) {
      case 'VIP':
        return 1.5;
      case 'Early Bird':
        return 0.85;
      default:
        return 1.0;
    }
  };

  const unitPrice = Math.round(event.price * getMultiplier(ticketTier));
  const totalAmount = unitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > remainingSeats) return;
    await onConfirm(quantity, ticketTier);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>Ticket Selection</span>
          </div>

          <h2 className="font-outfit text-2xl font-bold leading-snug pr-8">{event.title}</h2>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100 mt-3 pt-3 border-t border-blue-700/60">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {event.time}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.venue}</span>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Ticket Tier Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">Choose Ticket Tier</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* General Tier */}
              <div
                onClick={() => setTicketTier('General')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  ticketTier === 'General'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">General</span>
                  {ticketTier === 'General' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-lg font-extrabold text-blue-600 mt-1">${Math.round(event.price)}</p>
                <p className="text-[11px] text-slate-500 mt-1">Standard Entry & Seating</p>
              </div>

              {/* VIP Tier */}
              <div
                onClick={() => setTicketTier('VIP')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  ticketTier === 'VIP'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    VIP Pass
                  </span>
                  {ticketTier === 'VIP' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-lg font-extrabold text-blue-600 mt-1">${Math.round(event.price * 1.5)}</p>
                <p className="text-[11px] text-slate-500 mt-1">Front Seats + Lounge</p>
              </div>

              {/* Early Bird Tier */}
              <div
                onClick={() => setTicketTier('Early Bird')}
                className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                  ticketTier === 'Early Bird'
                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Early Bird</span>
                  {ticketTier === 'Early Bird' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-lg font-extrabold text-blue-600 mt-1">${Math.round(event.price * 0.85)}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">Save 15% Discount</p>
              </div>

            </div>
          </div>

          {/* Ticket Quantity Selector */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Select Quantity</p>
              <p className="text-xs text-slate-500">Maximum {Math.min(10, remainingSeats)} tickets per user</p>
            </div>

            <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-slate-900 text-base">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(Math.min(10, remainingSeats), quantity + 1))}
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Ticket Tier:</span>
              <span className="font-bold text-slate-900">{ticketTier} (${unitPrice} each)</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-bold text-slate-900">{quantity} Ticket(s)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Service & Facility Fee:</span>
              <span className="text-emerald-600 font-semibold">$0.00 (Waived)</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-900 pt-3 border-t border-slate-200">
              <span className="text-base font-bold">Total Amount:</span>
              <span className="text-2xl font-extrabold text-blue-600">${totalAmount}</span>
            </div>
          </div>

          {/* Guarantee pill */}
          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-200 text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Instant digital ticket generation with unique QR verification code.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || remainingSeats <= 0}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-base bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>{loading ? 'Processing Order...' : `Confirm & Book ($${totalAmount})`}</span>
          </button>
        </form>

      </div>
    </div>
  );
};

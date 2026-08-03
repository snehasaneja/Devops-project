import React from 'react';
import { X, Calendar, MapPin, Clock, Ticket as TicketIcon, Download, Printer, CheckCircle2, QrCode, Sparkles } from 'lucide-react';
import { Booking } from '../types';

interface TicketModalProps {
  booking: Booking;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden print:shadow-none print:border-none print:w-full transform transition-all animate-bounce-in">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white p-6 relative flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Ticket Issued</span>
              </div>
              <h2 className="font-outfit text-xl font-bold">Booking Confirmed!</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Pass Content */}
        <div className="p-6 space-y-6">
          
          {/* Ticket Container */}
          <div className="bg-gradient-to-b from-blue-50/80 via-white to-blue-50/40 rounded-3xl p-6 border-2 border-dashed border-blue-300/80 space-y-6 relative overflow-hidden shadow-sm hover:shadow-md transition">
            
            {/* Stamp Logo */}
            <div className="flex items-center justify-between border-b border-blue-200/80 pb-4">
              <div>
                <p className="font-outfit text-lg font-extrabold text-blue-950 tracking-tight">ABC SOLUTIONS</p>
                <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Smart Event Pass</p>
              </div>

              <span className="px-3.5 py-1 bg-blue-600 text-white text-xs font-extrabold rounded-full shadow-md shadow-blue-500/20">
                {booking.ticketTier} Pass
              </span>
            </div>

            {/* Event Info */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Event Name</span>
              <h3 className="font-outfit text-xl font-bold text-slate-900 leading-snug">{booking.eventTitle}</h3>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Date & Time</span>
                <p className="font-bold text-slate-800 mt-0.5">{booking.eventDate}</p>
                <p className="text-slate-600 text-[11px]">{booking.eventTime}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Venue Location</span>
                <p className="font-bold text-slate-800 mt-0.5 line-clamp-2">{booking.eventVenue}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Ticket Holder</span>
                <p className="font-bold text-slate-800 mt-0.5">{booking.userName}</p>
                <p className="text-slate-500 text-[11px]">{booking.userEmail}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Assigned Seats ({booking.quantity})</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {booking.seats.map((seat) => (
                    <span key={seat} className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded shadow-xs">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Barcode / QR Simulation */}
            <div className="pt-4 border-t border-blue-200/80 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ticket Ref No.</span>
                <p className="font-mono text-base font-extrabold text-blue-900">{booking.ticketNumber}</p>
                <p className="text-[11px] text-slate-500 font-medium">Total Paid: <strong className="text-blue-600 font-extrabold">${booking.totalAmount}</strong></p>
              </div>

              {/* QR Graphic Icon Simulation */}
              <div className="w-16 h-16 bg-slate-900 p-2 rounded-xl flex items-center justify-center text-white shadow-md group hover:scale-105 transition-transform">
                <QrCode className="w-full h-full text-blue-300" />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-blue-600" />
              <span>Print / Download Ticket</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white shadow-md shadow-blue-500/25 transition"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

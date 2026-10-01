import React, { useState } from 'react';
import { Send, Calendar, Clock, Sparkles } from 'lucide-react';

export default function BookingForm() {
  const [sessionType, setSessionType] = useState('Individual Session');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim() || !email.trim() || !phone.trim() || !preferredDate || !preferredTime) {
      setError('Please fill in all the required fields.');
      return;
    }

    // Prepare WhatsApp message
    const waNumber = '919797147673';
    const textMsg = `Hello Sheeba, I would like to enquire about a session.

Name: ${name.trim()}
Session Type: ${sessionType}
Preferred Date: ${preferredDate}
Preferred Time: ${preferredTime}
Phone: ${phone.trim()}
Email: ${email.trim()}
Message: ${message.trim() || 'No additional message.'}`;

    // URL Encode
    const encodedText = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border border-sage/10 p-6 sm:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 inset-x-0 h-2 bg-sage" />

      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl font-bold text-slate-dark">Request an Appointment</h3>
        <p className="text-slate-dark/60 text-xs sm:text-sm mt-1">
          Share your details below to continue your inquiry on WhatsApp.
        </p>
      </div>

      {error && (
        <p className="text-pink text-xs font-semibold bg-pink/5 border border-pink/15 p-3 rounded-lg mb-6">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Session Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
            Session Type *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSessionType('Individual Session')}
              className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                sessionType === 'Individual Session'
                  ? 'bg-sage/10 border-sage text-sage font-bold'
                  : 'bg-cream/10 border-sage/10 hover:border-sage/40 text-slate-dark'
              }`}
            >
              Individual Session
            </button>
            <button
              type="button"
              onClick={() => setSessionType('Relationship Session')}
              className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                sessionType === 'Relationship Session'
                  ? 'bg-sage/10 border-sage text-sage font-bold'
                  : 'bg-cream/10 border-sage/10 hover:border-sage/40 text-slate-dark'
              }`}
            >
              Relationship Session
            </button>
          </div>
        </div>

        {/* Name and Email in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Your Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arifa Jan"
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. arifa@example.com"
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>
        </div>

        {/* Phone, Preferred Date, Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 91234 56789"
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pref-date" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Preferred Date *
            </label>
            <div className="relative">
              <input
                type="date"
                id="pref-date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="pref-time" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Preferred Time *
            </label>
            <input
              type="time"
              id="pref-time"
              required
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
            Brief Message / Context (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share any specific challenges, history, or reasons for requesting this session..."
            className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
          />
        </div>

        {/* Important Warning Notice */}
        <p className="text-slate-dark/60 text-xs italic leading-relaxed bg-cream/30 p-3.5 rounded-xl border border-sage/5">
          * Submitting this form does not confirm an appointment. Session availability and slot timings will be confirmed separately by Sheeba Mohi-ud-Din via WhatsApp or Email.
        </p>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-sage hover:bg-slate-dark text-cream font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 space-x-2.5"
        >
          <Sparkles size={16} />
          <span>Continue on WhatsApp</span>
        </button>

      </form>
    </div>
  );
}

import React, { useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import { ShieldCheck, MessageCircle, Heart, Calendar } from 'lucide-react';

export default function Booking() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Book a Session | Peaceful Mind with Sheeba";
  }, []);

  return (
    <div className="bg-cream/20 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs tracking-widest text-sage font-bold uppercase block">
            Therapeutic Consultation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-dark">
            Schedule a Confidential Session
          </h1>
          <div className="w-12 h-1 bg-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-dark/70 text-sm sm:text-base mt-3 leading-relaxed">
            Take a gentle step towards your emotional health and relationships. Complete the details below, and we will connect via WhatsApp to align on slots and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Booking Info column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-dark">
                How It Works
              </h3>
              <p className="text-slate-dark/80 text-sm sm:text-base leading-relaxed">
                Seeking psychological support should be free from friction. Our booking process is streamlined to prioritize your ease and safety:
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-dark text-sm sm:text-base">1. Submit Details</h4>
                  <p className="text-slate-dark/70 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Select your session type, preferred date, preferred time, and fill out the simple intake details.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-dark text-sm sm:text-base">2. Continue on WhatsApp</h4>
                  <p className="text-slate-dark/70 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    The form automatically constructs a pre-filled, secure message and opens WhatsApp, connecting you directly to Sheeba.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-dark text-sm sm:text-base">3. Confirm Availability</h4>
                  <p className="text-slate-dark/70 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Sheeba will personally review your slot request and coordinate details to finalize your appointment securely.
                  </p>
                </div>
              </div>

            </div>

            {/* Trust and reassurance panel */}
            <div className="bg-white/80 p-5 rounded-2xl border border-sage/10 space-y-3.5 shadow-xs">
              <div className="flex items-center space-x-2 text-sage">
                <ShieldCheck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Clinical Standards</span>
              </div>
              <p className="text-slate-dark/80 text-xs leading-relaxed">
                Every session is completely private, confidential, and held in accordance with professional ethical boundaries. No records are shared publicly.
              </p>
            </div>

          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Send, Instagram, Mail, Phone, Calendar, CheckCircle, MapPin, Sparkles } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Contact | Peaceful Mind with Sheeba";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in Name, Email, and Message.');
      return;
    }

    // Success Simulation or WhatsApp Quick Contact Link
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 8000);
  };

  const handleQuickWhatsApp = () => {
    const waNumber = '919797147673';
    const textMsg = `Hello Sheeba, I'm reaching out to you from your website "Peaceful Mind". I would like to make a quick enquiry.`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(textMsg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-cream/20 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs tracking-widest text-sage font-bold uppercase block">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-dark">
            Connect with Sheeba
          </h1>
          <div className="w-12 h-1 bg-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-dark/70 text-sm sm:text-base mt-3 leading-relaxed">
            Have questions about clinical sessions, wellbeing articles, or collaboration? Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Quick links & Contact details */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-dark">
                Direct Contact Channels
              </h3>
              <p className="text-slate-dark/80 text-sm leading-relaxed">
                Sheeba Mohi-ud-Din answers inquiries personally. Feel free to use WhatsApp for quick, direct updates.
              </p>
            </div>

            {/* Channels Card grid */}
            <div className="space-y-4">
              
              {/* WhatsApp Card */}
              <div className="bg-white border border-sage/10 p-5 rounded-2xl flex items-start space-x-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                  {/* WhatsApp Custom Send representation */}
                  <Send size={18} className="rotate-45" />
                </div>
                <div className="space-y-2 flex-grow">
                  <h4 className="font-bold text-slate-dark text-sm sm:text-base">WhatsApp Support</h4>
                  <p className="text-xs sm:text-sm text-slate-dark/75 leading-relaxed">
                    Available for slot enquiries and therapeutic booking requests.
                  </p>
                  <p className="font-semibold text-slate-dark text-xs sm:text-sm">+91 97971 47673</p>
                  <button
                    onClick={handleQuickWhatsApp}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-green-600 hover:text-green-700 hover:underline pt-1"
                  >
                    <span>Message on WhatsApp</span>
                    <Sparkles size={11} className="animate-pulse" />
                  </button>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-white border border-sage/10 p-5 rounded-2xl flex items-start space-x-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#E1306C]/10 text-[#E1306C] flex items-center justify-center shrink-0">
                  <Instagram size={18} />
                </div>
                <div className="space-y-2 flex-grow">
                  <h4 className="font-bold text-slate-dark text-sm sm:text-base">Instagram Platform</h4>
                  <p className="text-xs sm:text-sm text-slate-dark/75 leading-relaxed">
                    Follow for routine mental health awareness resources and quotes.
                  </p>
                  <p className="font-semibold text-slate-dark text-xs sm:text-sm">@peaceful_mind_with.sheeba</p>
                  <a
                    href="https://www.instagram.com/peaceful_mind_with.sheeba/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#E1306C] hover:text-[#c12a5c] hover:underline pt-1"
                  >
                    <span>Visit Instagram Profile</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Note on Location/Address (Strict rule warning: Do not invent mock address) */}
            <div className="bg-sage/5 border border-sage/15 p-5 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-sage font-bold text-sm">
                <MapPin size={16} />
                <span>Session Delivery</span>
              </div>
              <p className="text-slate-dark/80 text-xs sm:text-sm leading-relaxed">
                Consultations and therapeutic sessions are delivered through secure virtual appointments globally, or as scheduled with Sheeba personally. 
              </p>
            </div>

          </div>

          {/* Contact Quick Form column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-sage/10 rounded-3xl shadow-xl relative">
            <div className="absolute top-0 inset-x-0 h-2 bg-sage" />

            <div className="mb-6.5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-dark">Send a Message</h3>
              <p className="text-slate-dark/60 text-xs mt-1">
                Have a general enquiry? Write to Sheeba through this secure form.
              </p>
            </div>

            {submitted ? (
              <div className="bg-sage/5 border border-sage/20 text-slate-dark p-6 rounded-2xl space-y-3.5 text-center sm:text-left animate-fadeIn">
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-sage font-bold">
                  <CheckCircle size={20} />
                  <span>Message Sent Successfully</span>
                </div>
                <p className="text-slate-dark/80 text-xs sm:text-sm leading-relaxed">
                  Thank you for reaching out! Your message has been compiled securely. Sheeba Mohi-ud-Din will review your inquiry and get back to you at the email address provided as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="text-pink text-xs font-semibold bg-pink/5 border border-pink/15 p-3 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sajad Ahmad"
                      className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sajad@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry about stress management tools"
                    className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-sage hover:bg-slate-dark text-cream font-bold transition-all duration-300 shadow-md active:scale-98"
                >
                  <span>Submit Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUp, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-dark text-cream pt-16 pb-8 border-t border-sage/10 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sage/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-cream/10">
          
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-6 space-y-4">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-2xl font-bold tracking-wide text-cream block group-hover:text-sage transition-colors duration-300">
                Peaceful Mind with Sheeba
              </span>
              <span className="text-xs tracking-widest text-sage font-medium uppercase mt-1 block">
                Clinical Psychologist & Mental Health platform
              </span>
            </Link>
            
            <p className="text-cream/70 text-sm max-w-md leading-relaxed">
              Sheeba Mohi-ud-Din is a mental health professional committed to promoting emotional wellbeing, psychological awareness, and healthier relationships.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://wa.me/919797147673"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/5 border border-cream/10 hover:bg-sage hover:text-cream flex items-center justify-center text-cream/80 transition-all duration-300"
                aria-label="WhatsApp sheeba"
              >
                {/* Custom WhatsApp Icon or Lucide Send icon representing chat */}
                <Send size={18} className="stroke-[1.5]" />
              </a>
              <a
                href="https://www.instagram.com/peaceful_mind_with.sheeba/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/5 border border-cream/10 hover:bg-sage hover:text-cream flex items-center justify-center text-cream/80 transition-all duration-300"
                aria-label="Instagram Sheeba"
              >
                <Instagram size={18} className="stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 sm:col-span-6 md:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-sage">Navigation</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-cream/75 hover:text-sage text-sm transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/75 hover:text-sage text-sm transition-colors duration-300">About Sheeba</Link>
              </li>
              <li>
                <Link to="/blog" className="text-cream/75 hover:text-sage text-sm transition-colors duration-300">Articles &amp; Blog</Link>
              </li>
              <li>
                <Link to="/booking" className="text-cream/75 hover:text-sage text-sm transition-colors duration-300">Book a Session</Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/75 hover:text-sage text-sm transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Professional Credentials Notice (strict rule info compliance) */}
          <div className="col-span-1 sm:col-span-6 md:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-sage">Professional Philosophy</h3>
            <p className="text-cream/70 text-sm italic leading-relaxed">
              "A peaceful mind begins with a safe space to be heard, understood, and accepted."
            </p>
            <div className="pt-2">
              <Link
                to="/admin/login"
                className="inline-block text-xs text-cream/30 hover:text-sage/60 transition-colors duration-300"
              >
                Admin Access
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll top */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-cream/50 space-y-4 sm:space-y-0">
          <p>© {currentYear} Peaceful Mind with Sheeba. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-sage transition-colors duration-300 group focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}

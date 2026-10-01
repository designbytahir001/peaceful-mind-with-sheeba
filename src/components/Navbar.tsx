import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Articles', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-sage/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-cream shadow-md transition-transform duration-500 group-hover:rotate-12">
                <Sparkles size={20} className="stroke-[1.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wide text-slate-dark leading-tight">
                  Peaceful Mind
                </span>
                <span className="text-xs tracking-widest text-sage font-medium uppercase -mt-0.5">
                  with Sheeba
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-sage'
                    : 'text-slate-dark/75 hover:text-sage'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage rounded-full" />
                )}
              </Link>
            ))}

            <Link
              to="/booking"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-sage text-cream text-sm font-medium hover:bg-slate-dark hover:text-cream transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 space-x-2"
            >
              <Calendar size={15} />
              <span>Book a Session</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-dark/80 hover:text-sage p-2 rounded-md transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream border-b border-sage/10 shadow-lg animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-sage/10 text-sage font-semibold'
                    : 'text-slate-dark hover:bg-sage/5 hover:text-sage'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 px-4">
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sage text-cream text-base font-medium hover:bg-slate-dark transition-all duration-300 shadow-md space-x-2"
              >
                <Calendar size={18} />
                <span>Book a Session</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

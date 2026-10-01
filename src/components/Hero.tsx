import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream to-white py-20 sm:py-28">
      {/* Decorative calm background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-pink/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tag/Badge */}
            <div className="inline-flex items-center space-x-2 bg-sage/10 text-sage px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={12} className="text-sage animate-pulse" />
              <span>Welcoming You with Warmth and Empathy</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-dark tracking-tight leading-tight">
              Creating Space for a <span className="text-sage italic font-normal">Peaceful Mind</span>
            </h1>

            {/* Supporting text */}
            <p className="text-slate-dark/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A safe, respectful and non-judgmental space for emotional wellbeing, healthier relationships and personal growth with Sheeba Mohi-ud-Din.
            </p>

            {/* Bullet benefits */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-xs sm:text-sm text-slate-dark/75 font-medium">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck size={16} className="text-sage stroke-[2]" />
                <span>Private & Confidential</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Heart size={16} className="text-sage stroke-[2]" />
                <span>Non-judgmental Space</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles size={16} className="text-sage stroke-[2]" />
                <span>Personalized Approach</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sage text-cream font-medium text-base hover:bg-slate-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 space-x-2.5"
              >
                <Calendar size={18} />
                <span>Book a Session</span>
              </Link>
              
              <Link
                to="/blog"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-sage/20 text-slate-dark hover:border-sage hover:bg-cream/20 font-medium text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-95 space-x-2.5"
              >
                <span>Explore Articles</span>
                <ArrowRight size={16} className="text-sage" />
              </Link>
            </div>

          </div>

          {/* Hero graphic / Calm illustration layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Outer decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sage/10 to-pink/10 rounded-3xl rotate-3 scale-102 blur-sm -z-10" />
              
              {/* Image Frame */}
              <div className="aspect-[4/5] bg-cream rounded-3xl border border-sage/15 overflow-hidden shadow-2xl relative">
                
                {/* Beautiful soothing Unsplash image */}
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800"
                  alt="Soothing peaceful water stone stack"
                  className="w-full h-full object-cover grayscale-[10%] brightness-[95%] transition-transform duration-700 hover:scale-105"
                />
                
                {/* Embedded quote panel */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border border-sage/10 p-5 rounded-2xl shadow-lg">
                  <p className="text-xs sm:text-sm font-serif italic text-slate-dark/90 leading-relaxed">
                    "A peaceful mind begins with a safe space to be heard, understood, and accepted."
                  </p>
                  <p className="text-[10px] sm:text-xs tracking-wider text-sage font-semibold uppercase mt-2">
                    — Sheeba Mohi-ud-Din
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

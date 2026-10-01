import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';

export default function AboutPreview() {
  return (
    <section className="py-20 bg-cream/30 border-t border-b border-sage/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Profile Picture Placeholder Frame */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="relative mx-auto max-w-[340px] sm:max-w-[380px]">
              
              {/* Soft decorative background box */}
              <div className="absolute -inset-4 bg-pink/15 rounded-3xl -rotate-2 -z-10" />
              <div className="absolute -inset-4 bg-sage/10 rounded-3xl rotate-1 -z-10" />
              
              {/* Main image container */}
              <div className="aspect-[3/4] bg-cream rounded-3xl overflow-hidden shadow-xl border border-sage/10 relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                  alt="Sheeba Mohi-ud-Din"
                  className="w-full h-full object-cover grayscale-[20%] brightness-[98%] transition-transform duration-500 hover:scale-102"
                />
                
                {/* Clean caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-dark/90 via-slate-dark/70 to-transparent p-6 text-cream">
                  <h3 className="font-serif text-lg font-bold">Sheeba Mohi-ud-Din</h3>
                  <p className="text-xs text-sage font-medium tracking-wide">Clinical Psychologist</p>
                </div>
              </div>

            </div>
          </div>

          {/* About Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs tracking-widest text-sage font-bold uppercase block">
                Meet Your Professional Guidance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-dark">
                Sheeba Mohi-ud-Din
              </h2>
              <p className="text-sm font-semibold tracking-wide text-sage">
                Clinical Psychologist | Mental Health &amp; Wellbeing Professional
              </p>
            </div>

            <div className="w-12 h-1 bg-sage rounded-full" />

            <div className="space-y-4 text-slate-dark/80 text-sm sm:text-base leading-relaxed">
              <p>
                Sheeba Mohi-ud-Din is a mental health professional committed to promoting emotional wellbeing, psychological awareness, and healthier relationships. Her approach focuses on creating a safe, respectful, and non-judgmental space where individuals can express their thoughts, emotions, and concerns openly.
              </p>
              <p className="hidden sm:block">
                Through her work, she aims to reduce the stigma surrounding mental health and encourage people to seek support without shame or hesitation. She believes that mental wellbeing is an essential part of a fulfilling life and that every individual deserves to be heard, understood, and supported.
              </p>
            </div>

            {/* Blockquote with Quote Icon */}
            <div className="bg-white/80 border-l-4 border-sage p-4 rounded-r-xl shadow-sm relative overflow-hidden">
              <Quote className="absolute right-4 bottom-2 text-sage/10 w-12 h-12 stroke-[1]" />
              <p className="font-serif text-sm italic text-slate-dark/90 leading-relaxed relative z-10">
                "A peaceful mind begins with a safe space to be heard, understood, and accepted."
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-sage font-semibold hover:text-slate-dark transition-colors duration-300 group text-sm sm:text-base"
              >
                <span>Read Full Professional Story</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

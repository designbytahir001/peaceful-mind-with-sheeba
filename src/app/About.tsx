import React, { useEffect } from 'react';
import { Quote, Sparkles, Smile, Heart, ShieldCheck, HeartHandshake, Eye, MapPin } from 'lucide-react';
import { FOCUS_AREAS, getIcon } from '../data/focusAreas';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "About Sheeba | Peaceful Mind with Sheeba";
  }, []);

  return (
    <div className="bg-cream/20 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Main Visual Photo Column */}
          <div className="lg:col-span-5">
            <div className="relative max-w-[360px] sm:max-w-[420px] mx-auto">
              {/* Layered borders */}
              <div className="absolute inset-0 bg-sage/10 rounded-3xl rotate-2 scale-102 blur-sm -z-10" />
              <div className="absolute -inset-4 bg-pink/10 rounded-3xl -rotate-1 -z-10" />
              
              <div className="aspect-[3/4] bg-cream rounded-3xl overflow-hidden shadow-2xl border border-sage/15">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                  alt="Sheeba Mohi-ud-Din Clinical Psychologist"
                  className="w-full h-full object-cover grayscale-[15%] brightness-[98%]"
                />
              </div>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-xs tracking-widest text-sage font-bold uppercase block">
                Professional Profile
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-dark">
                Sheeba Mohi-ud-Din
              </h1>
              <p className="font-medium text-sm sm:text-base text-sage tracking-wide uppercase">
                Clinical Psychologist | Mental Health &amp; Wellbeing Professional
              </p>
            </div>

            <div className="w-16 h-1 bg-sage rounded-full" />

            {/* Biography text - exact copy from prompt! */}
            <div className="space-y-5 text-slate-dark/85 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Sheeba Mohi-ud-Din is a mental health professional committed to promoting emotional wellbeing, psychological awareness, and healthier relationships. Her approach focuses on creating a safe, respectful, and non-judgmental space where individuals can express their thoughts, emotions, and concerns openly.
              </p>
              <p>
                Her areas of professional interest include children and adolescents, emotional wellbeing, stress and anxiety management, relationship and marital concerns, women’s emotional wellbeing, self-esteem, attachment-related concerns, and personal growth.
              </p>
              <p>
                Through her work, she aims to reduce the stigma surrounding mental health and encourage people to seek support without shame or hesitation. She believes that mental wellbeing is an essential part of a fulfilling life and that every individual deserves to be heard, understood, and supported.
              </p>
            </div>

            {/* Philosophy blockquote */}
            <div className="bg-white border-l-4 border-sage p-6 rounded-r-2xl shadow-sm relative overflow-hidden">
              <Quote className="absolute right-6 bottom-3 text-sage/10 w-16 h-16 stroke-[1]" />
              <p className="font-serif text-base sm:text-lg italic text-slate-dark/95 leading-relaxed relative z-10">
                "A peaceful mind begins with a safe space to be heard, understood, and accepted."
              </p>
              <p className="text-xs text-sage font-bold uppercase tracking-widest mt-2 relative z-10">
                — Professional Philosophy
              </p>
            </div>

          </div>

        </div>

        {/* Areas of Interest Detail */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-dark">
              Core Professional Interests &amp; Approach
            </h2>
            <div className="w-12 h-0.5 bg-sage mx-auto mt-3 rounded-full" />
            <p className="text-slate-dark/70 text-xs sm:text-sm mt-3 leading-relaxed">
              Applying clinically grounded, empathetic methods to address essential facets of human emotional and relational development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOCUS_AREAS.map((area) => {
              const IconComp = getIcon(area.iconName);
              return (
                <div key={area.id} className="bg-white border border-sage/10 rounded-2xl p-6.5 shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-sage/5 text-sage flex items-center justify-center">
                    <IconComp size={20} className="stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif font-bold text-slate-dark text-base">{area.title}</h3>
                  <p className="text-slate-dark/75 text-xs sm:text-sm leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calming reassurance banner */}
        <div className="bg-slate-dark text-cream p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl text-center sm:text-left">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sage/5 -mr-24 -mt-24 pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-sage text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Private &amp; Empathetic Support</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">Ready to take the next step towards your wellbeing?</h3>
              <p className="text-cream/70 text-sm max-w-2xl leading-relaxed">
                Starting therapeutic support can feel daunting, but you don't have to carry your burdens alone. Let's create a space tailored entirely to your emotional needs.
              </p>
            </div>
            <div className="lg:col-span-4 text-center lg:text-right shrink-0">
              <a
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-sage text-cream text-sm font-bold hover:bg-cream hover:text-slate-dark transition-all duration-300 shadow-md"
              >
                Inquire &amp; Book Session
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

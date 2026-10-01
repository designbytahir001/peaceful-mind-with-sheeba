import React from 'react';
import { FOCUS_AREAS, getIcon } from '../data/focusAreas';

export default function FocusAreas() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-dark">
            Areas of Professional Interest
          </h2>
          <div className="w-16 h-1 bg-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-dark/75 mt-4 text-base sm:text-lg">
            Providing therapeutic support, guidance, and a compassionate space to address various emotional, psychological, and relational dimensions of life.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FOCUS_AREAS.map((area) => {
            const IconComponent = getIcon(area.iconName);
            return (
              <div
                key={area.id}
                className="group relative bg-cream/30 border border-sage/10 rounded-2xl p-6 sm:p-8 hover:bg-cream hover:border-sage/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-xl bg-sage/10 text-sage flex items-center justify-center mb-6 group-hover:bg-sage group-hover:text-cream transition-colors duration-300">
                    <IconComponent size={24} className="stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-slate-dark mb-3 group-hover:text-sage transition-colors duration-300">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-dark/75 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </div>
                
                {/* Decorative bottom bar indicator */}
                <div className="w-0 h-0.5 bg-sage mt-6 group-hover:w-12 transition-all duration-300 rounded-full" />
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

import React from 'react';
import { Loader2, Inbox } from 'lucide-react';

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading information..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Loader2 className="w-10 h-10 text-sage animate-spin stroke-[1.5] mb-4" />
      <p className="text-slate-dark/70 text-sm font-medium">{message}</p>
    </div>
  );
};

export const EmptyState: React.FC<{ 
  title?: string; 
  description?: string; 
  action?: React.ReactNode 
}> = ({ 
  title = "No results found", 
  description = "There are no entries matches your current selection.", 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-cream/20 border border-dashed border-sage/20 rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-sage/5 flex items-center justify-center text-sage/60 mb-4">
        <Inbox size={24} className="stroke-[1.5]" />
      </div>
      <h3 className="font-serif text-lg font-bold text-slate-dark mb-1">{title}</h3>
      <p className="text-slate-dark/60 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

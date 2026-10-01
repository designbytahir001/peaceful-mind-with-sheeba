import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search articles..." }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-dark/40">
        <Search size={18} />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-sage/15 text-slate-dark placeholder-slate-dark/40 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/10 text-sm transition-all"
      />
      
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-dark/40 hover:text-slate-dark transition-colors"
          type="button"
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

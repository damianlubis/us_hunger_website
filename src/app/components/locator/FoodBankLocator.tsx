'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// Dynamic import for SearchContainer (contains heavy Google Maps libraries)
// This reduces initial TBT and splits the bundle for better performance
const SearchContainer = dynamic(() => import('./SearchContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[650px] bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-white/50 animate-pulse"></div>
       <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Initializing Locator...</p>
       </div>
    </div>
  )
});

export default function FoodBankLocator() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden relative" id="locator">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest">
              <MapPin className="w-3 h-3" />
              Live Resource Map
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-none tracking-tight">
              Emergency <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aid Locator</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-md text-right md:self-end">
            Real-time directory of verify 501(c)(3) food banks and state-sponsored nutrition assistance centers.
          </p>
        </div>

        <SearchContainer />
      </div>
    </section>
  );
}

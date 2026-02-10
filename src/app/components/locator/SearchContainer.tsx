'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import LocationCard from './LocationCard';
import { Place, SearchState, Location } from './types';

// Further granularize by specifically lazy-loading the Map component
const MapPreview = dynamic(() => import('./MapPreview'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center gap-3 animate-pulse">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin"></div>
        <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Map Engine Loading...</span>
    </div>
  )
});

export default function SearchContainer() {
  const [state, setState] = useState<SearchState>({
    places: [],
    userLocation: null,
    loading: false,
    error: null,
  });
  
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const fetchPlaces = async (lat: number, lng: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch('/api/locator/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lng }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setState(prev => ({
        ...prev,
        places: data.places || [],
        loading: false,
      }));
    } catch (err: any) {
        console.error("Locator Error:", err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Could not find nearby food banks. Please try again.',
      }));
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLoc: Location = { lat: latitude, lng: longitude };
        setState(prev => ({ ...prev, userLocation: userLoc }));
        fetchPlaces(latitude, longitude);
      },
      (error) => {
        setState(prev => ({ ...prev, loading: false, error: 'Location access denied. Please enable permissions.' }));
      }
    );
  };

  const listRef = React.useRef<HTMLDivElement>(null);

  // Scroll to selected card (Only scrolls the list, not the page)
  useEffect(() => {
    if (selectedPlaceId && listRef.current) {
        const cardElement = document.getElementById(`card-${selectedPlaceId}`);
        const container = listRef.current;
        
        if (cardElement && container) {
            const containerTop = container.getBoundingClientRect().top;
            const cardTop = cardElement.getBoundingClientRect().top;
            const scrollOffset = cardTop - containerTop + container.scrollTop - 12; // 12px padding offset
            
            container.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    }
  }, [selectedPlaceId]);
  
  return (
    <div className="grid lg:grid-cols-2 gap-8 h-[650px] overflow-hidden">
      {/* Left Column: List & Controls */}
      <div className="flex flex-col gap-6 h-full min-h-0">
        {/* Controls (Fixed height part) */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-4 shrink-0">
            <h3 className="text-xl font-black text-primary">Find Support Nearby</h3>
            <p className="text-slate-400 text-sm font-medium">
                Locate verified food banks, pantries, and emergency nutrition assistance within 25km of your location.
            </p>
            <button 
                onClick={handleLocateMe}
                disabled={state.loading}
                className="flex items-center justify-center gap-2 bg-primary text-white p-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {state.loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <MapPin className="w-5 h-5" />
                )}
                {state.loading ? 'Scanning Area...' : 'Use My Current Location'}
            </button>
            {state.error && (
                <div className="flex items-center gap-2 text-danger text-xs font-bold bg-danger/5 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {state.error}
                </div>
            )}
        </div>

        {/* Results Section - Scrollable container */}
        <div 
            ref={listRef}
            className="flex-1 overflow-y-auto bg-slate-50/50 rounded-[2rem] border border-slate-100/50 shadow-inner relative custom-scrollbar overscroll-contain touch-pan-y min-h-0"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
            {/* List Header - Sticky */}
            {state.places.length > 0 && (
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/95 backdrop-blur-md z-10 sticky top-0 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        {state.places.length} Locations Found
                    </span>
                    <div className="text-[9px] font-bold text-slate-300 italic">Scroll for more</div>
                </div>
            )}

            <div className="p-5 space-y-4">
                {state.places.length === 0 && !state.loading && !state.error && (
                    <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-300 text-sm font-bold text-center p-8 border-2 border-dashed border-slate-100 rounded-3xl bg-white/30">
                        <Search className="w-8 h-8 mb-2 opacity-50" />
                        <p>Results will appear here based on your location.</p>
                    </div>
                )}
                
                {state.places.map((place) => (
                    <LocationCard 
                        key={place.id}
                        {...place}
                        isSelected={selectedPlaceId === place.id}
                        address={place.formattedAddress}
                        onSelect={() => setSelectedPlaceId(place.id)}
                    />
                ))}

                {/* Bottom spacer for breathing room */}
                <div className="h-12 w-full"></div>
            </div>
        </div>
      </div>

      {/* Right Column: Map Preview */}
      <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/5 border border-slate-100 bg-slate-50 relative">
        <MapPreview 
            places={state.places}
            userLocation={state.userLocation}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
        />
        {/* API Key Warning Overlay (Dev only - remove in prod if key exists) */}
        {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
             <div className="absolute inset-x-0 bottom-0 bg-black/80 text-white text-[10px] p-2 text-center z-20">
                Dev Note: Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env to enable map
             </div>
        )}
      </div>
    </div>
  );
}

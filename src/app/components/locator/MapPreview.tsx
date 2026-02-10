'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Place, Location } from './types';
import { Star, MapPin, Clock, Navigation, ExternalLink } from 'lucide-react';

interface MapPreviewProps {
  places: Place[];
  userLocation: Location | null;
  selectedPlaceId?: string | null;
  onSelectPlace?: (placeId: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
};

const defaultCenter = {
  lat: 39.8283, // Center of USA
  lng: -98.5795
};

export default function MapPreview({ places, userLocation, selectedPlaceId, onSelectPlace }: MapPreviewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    preventGoogleFontsLoading: true,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<Location>(defaultCenter);
  const [zoom, setZoom] = useState(4);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Sync internal state with userLocation on initial detection
  useEffect(() => {
    if (userLocation && !selectedPlaceId && places.length === 0) {
        setCenter(userLocation);
        setZoom(14);
    }
  }, [userLocation]);

  // Handle auto-fit and centering logic
  useEffect(() => {
    if (!map || !userLocation) return;

    // Use a small timeout to ensure map instance is ready
    const timeoutId = setTimeout(() => {
        if (places.length === 0) {
            map.setCenter(userLocation);
            map.setZoom(14);
        } else {
            // Find bounds that encompass all results + user
            const bounds = new window.google.maps.LatLngBounds();
            
            // Calculate max distance to keep user central
            let maxLatDiff = 0.005; 
            let maxLngDiff = 0.005;

            places.forEach(place => {
                maxLatDiff = Math.max(maxLatDiff, Math.abs(userLocation.lat - place.location.lat));
                maxLngDiff = Math.max(maxLngDiff, Math.abs(userLocation.lng - place.location.lng));
            });

            // Add 15% padding
            maxLatDiff *= 1.15;
            maxLngDiff *= 1.15;

            bounds.extend({ lat: userLocation.lat + maxLatDiff, lng: userLocation.lng + maxLngDiff });
            bounds.extend({ lat: userLocation.lat - maxLatDiff, lng: userLocation.lng - maxLngDiff });
            
            map.fitBounds(bounds);
            
            // Re-force center after fitBounds to be extra sure
            setTimeout(() => map.setCenter(userLocation), 50);
        }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [map, places, userLocation]);

  // Handle pin click centering
  useEffect(() => {
    if (map && selectedPlaceId) {
        const place = places.find(p => p.id === selectedPlaceId);
        if (place) {
            map.panTo(place.location);
            if (map.getZoom()! < 15) map.setZoom(15);
        }
    }
  }, [selectedPlaceId, map, places]);

  if (!apiKey) {
    // ... same missing API key view ...
    return (
      <div className="w-full h-full bg-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 p-8 text-center border-2 border-dashed border-slate-200">
        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">!</span>
        </div>
        <h3 className="font-bold text-primary mb-2">Setup Required</h3>
        <p className="text-xs max-w-xs">
          Please add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code> file to enable the map.
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full bg-red-50 rounded-3xl flex flex-col items-center justify-center text-red-500 p-8 text-center">
         <p className="font-bold">Map Failed to Load</p>
         <p className="text-xs">{loadError.message}</p>
      </div>
    );
  }

  const selectedPlace = places.find(p => p.id === selectedPlaceId);

  if (!isLoaded) {
    return <div className="w-full h-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center text-slate-400 font-bold">Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
      }}
    >
      {/* User Location Marker */}
      {userLocation && (
        <Marker
          position={userLocation}
          zIndex={10}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4F46E5",
            fillOpacity: 1,
            strokeColor: "white",
            strokeWeight: 2,
          }}
          title="You are here"
        />
      )}

      {/* Place Markers */}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.location}
          title={place.name}
          animation={selectedPlaceId === place.id ? window.google.maps.Animation.BOUNCE : undefined}
          onClick={() => onSelectPlace?.(place.id)}
        />
      ))}

      {/* Detail Window */}
      {selectedPlace && (
          <InfoWindow
            position={selectedPlace.location}
            onCloseClick={() => onSelectPlace?.('')}
          >
            <div className="p-6 max-w-[280px] min-w-[220px] font-sans bg-secondary rounded-[2rem] border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Premium glass effect highlight */}
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                
                <h4 className="font-black text-white text-base leading-tight mb-3 pr-2 relative z-10">{selectedPlace.name}</h4>
                
                <div className="space-y-3 relative z-10">
                    <div className="flex items-start gap-2 text-[11px] text-white/90 font-medium">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-white/60" />
                        <span className="leading-tight">{selectedPlace.formattedAddress}</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-white/10">
                        {selectedPlace.rating ? (
                            <div className="flex items-center gap-1.5 text-[11px] font-black text-white">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{selectedPlace.rating}</span>
                                <span className="text-[9px] text-white/60 font-medium">({selectedPlace.userRatingCount})</span>
                            </div>
                        ) : <div />}
                        
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-[9px] font-black tracking-wider uppercase whitespace-nowrap">
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedPlace.isOpenNow ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                            <span className={selectedPlace.isOpenNow ? 'text-green-500' : 'text-red-300'}>
                                {selectedPlace.isOpenNow ? 'Open' : 'Closed'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10">
                        {selectedPlace.googleMapsUri && (
                            <a 
                                href={selectedPlace.googleMapsUri}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-secondary transition-all text-[9px] font-black uppercase tracking-widest"
                            >
                                <Navigation className="w-2.5 h-2.5" />
                                Go
                            </a>
                        )}
                        {selectedPlace.websiteUri && (
                             <a 
                                href={selectedPlace.websiteUri}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-primary transition-all text-[9px] font-black uppercase tracking-widest"
                             >
                                <ExternalLink className="w-2.5 h-2.5" />
                                Site
                             </a>
                        )}
                    </div>
                </div>
            </div>
          </InfoWindow>
      )}
    </GoogleMap>
  );
}
